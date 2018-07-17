var CodeModel = require('../models/request/codeModel');
var ErrorModel = require('../models/response/errorModel').ErrorModel;
var ErrorItem = require('../models/response/errorModel').ErrorItem;

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
}