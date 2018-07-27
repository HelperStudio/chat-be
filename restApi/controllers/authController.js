var AuthValidator = require('../validators/authValidator');
var CodeModel = require('../models/request/codeModel');
var LoginCommand = require('../../BLL/commands/auth/loginCommand');

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
        const loginCommand = new LoginCommand();
        let result = loginCommand.execute(code);
        return result;
    }
}