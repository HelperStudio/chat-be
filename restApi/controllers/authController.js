var AuthValidator = require('../validators/authValidator');
var CodeModel = require('../models/request/codeModel');
var HttpClient = require('../../common/httpClient');
var TokenRequestModel = require("../models/google/tokenRequestModel");
var TokenResponseModel = require("../models/google/tokenResponseModel");
var GoogleConfigModel = require("../models/config/google");
var SuccessModel = require("../models/response/successModel");
var ErrorModel = require("../models/response/errorModel").ErrorModel;
var ErrorItem = require("../models/response/errorModel").ErrorItem;
var UserModel = require("../models/response/userModel");
var AuthModel = require("../models/response/authModel");
var config = require('../../configs/config');

module.exports = class AuthController {
    constructor(app) {
        this._app = app;
        this.prefix = "/auth";
    }

    async initialize() {
        var self = this;
        this._app.post(this.prefix + "/code", async(req, res) => {
            var codeModel = new CodeModel(req.body);
            var validationResult = AuthValidator.code(codeModel);
            if (validationResult.errors.length > 0) {
                res.status(validationResult.httpCode).send(validationResult);
            } else {
                var response = await self.Authorize(codeModel);
                res.status(response.httpCode).send(response);
            }
        });
    }

    async Authorize(code) {
        var codeModel = new CodeModel(code);
        var httpClient = new HttpClient("www.googleapis.com");
        var googleConfig = new GoogleConfigModel(config.google);
        var tokenRequestModel = new TokenRequestModel(
            codeModel.code,
            googleConfig.clientId,
            googleConfig.clientSecret,
            googleConfig.redirectUri,
            googleConfig.grantType);

        var authResponse = await httpClient.post("/oauth2/v4/token", tokenRequestModel, 'application/x-www-form-urlencoded');
        if (authResponse.error) {
            var errorItem = new ErrorItem("service.google", authResponse.error + authResponse.error_description);
            return new ErrorModel(503, errorItem);
        } else {
            var tokenResponseModel = new TokenResponseModel(authResponse);
            var userInfo = await httpClient.get('/oauth2/v1/userinfo?alt=json&access_token=' + tokenResponseModel.accessToken);
            var userModel = new UserModel(userInfo.id, userInfo.name, userInfo.picture, userInfo.gender);
            var authModel = new AuthModel(tokenResponseModel, userModel);
            return new SuccessModel(authModel);
        }

    }
}