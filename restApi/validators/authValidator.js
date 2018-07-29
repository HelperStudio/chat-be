const moment = require("moment");
const CodeModel = require('../models/request/codeModel');
const ErrorModel = require('../models/response/errorModel').ErrorModel;
const SuccessModel = require('../models/response/successModel');
const ErrorItem = require('../models/response/errorModel').ErrorItem;
const GetTokensQuerier = require('../../BLL/queriers/auth/getTokensQuerier');

module.exports = class AuthValidator {
    static code(codeModel) {
        var codeModel = new CodeModel(codeModel);
        var errors = [];
        if (!codeModel.code)
            errors.push(new ErrorItem("bad_parameter.code", "code must be specified"));
        var res = new ErrorModel(409, errors);
        if (errors.length = 0) {
            res.httpCode = 200;
        }
        return res;
    }

    static async authCheck(accessToken) {
        let getTokensQuerier = new GetTokensQuerier();
        let token = await getTokensQuerier.execute(accessToken);
        let errors = [];
        if (token == null) {
            errors.push(new ErrorItem("auth.invalid_access_token", "Invalid Access Token"));
        } else if (token.expire < moment.utc().format("x")) {
            errors.push(new ErrorItem("auth.expired_access_token", "Access Token Was expired"));
        }
        if (errors.length > 0) {
            return new ErrorModel(401, errors);
        } else {
            return new SuccessModel(token)
        }
    }
}