const { Pool } = require('pg')
const moment = require('moment');
const config = require('../../../configs/config');
const TokenRepository = require('../../../db/repositories/tokenRepository');
const UserRepository = require('../../../db/repositories/userRepository');
const TransationHelper = require('../../../db/transactionHelper');

const CodeModel = require('../../../restApi/models/request/codeModel');
const GoogleConfigModel = require('../../../restApi/models/config/google');
const TokenRequestModel = require('../../../restApi/models/google/tokenRequestModel');
const TokenResponseModel = require('../../../restApi/models/google/tokenResponseModel');
const { ErrorItem, ErrorModel } = require('../../../restApi/models/response/errorModel');
const SuccessModel = require('../../../restApi/models/response/successModel');
const UserModel = require('../../../restApi/models/response/userModel');
const AuthModel = require('../../../restApi/models/response/authModel');

const HttpClient = require('../../../common/httpClient');

module.exports = class LoginCommand {
    constructor() {}

    async execute(code) {
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
            var errorItem = new ErrorItem("service.google", authResponse.error + ': ' + authResponse.error_description);
            return new ErrorModel(503, errorItem);
        } else {
            var tokenResponseModel = new TokenResponseModel(authResponse);
            var userInfo = await httpClient.get('/oauth2/v1/userinfo?alt=json&access_token=' + tokenResponseModel.accessToken);
            var userModel = new UserModel(
                userInfo.id,
                userInfo.name,
                userInfo.picture,
                userInfo.gender);
            try {
                await this.dbActions(
                    userModel.id,
                    tokenResponseModel.accessToken,
                    tokenResponseModel.refreshToken,
                    tokenResponseModel.expiresIn,
                    userInfo.name,
                    userInfo.picture,
                    userInfo.gender)
                var authModel = new AuthModel(tokenResponseModel, userModel);
                return new SuccessModel(authModel);
            } catch (err) {
                var errorItem = new ErrorItem("server.db", err.message);
                return new ErrorModel(500, errorItem);
            }
        }
    }

    async dbActions(
        userId,
        accessToken,
        refreshToken,
        expireIn,
        name,
        picture,
        gender) {
        const pool = new Pool(config.db);
        const client = await pool.connect();

        var self = this;
        const transactionHelper = new TransationHelper(client);
        await transactionHelper.execute(async() => {
            const userRepository = new UserRepository(client);
            let user = await userRepository.getById(userId);
            if (user) {
                await userRepository.update(userId, name, picture, gender);
            } else {
                await userRepository.add(userId, name, picture, gender);
            }
            await self.storeTokenInDb(client, userId, accessToken, refreshToken, expireIn);
        })

    }

    async storeTokenInDb(dbClient, userId, accessToken, refreshToken, expireIn) {
        const tokenRepository = new TokenRepository(dbClient);
        let now = moment.utc();
        let expire = now.add(expireIn, 'milliseconds');
        tokenRepository.add(userId, accessToken, refreshToken, expire.format())
    }

}