var storage = require('../../storage/connectedUsers');
var SuccessModel = require("../models/response/successModel");

module.exports = class UserController {
    constructor(app) {
        this._app = app;
        this.prefix = "/users";
    }

    async initialize() {
        var self = this;
        this._app.get(this.prefix, async(req, res) => {
            var response = await self.GetUserList();
            res.status(response.httpCode).send(response);
        });
    }

    async GetUserList() {
        console.log("API users", storage.users);
        return new SuccessModel(storage.users);
    }
}