var SuccessModel = require("../models/response/successModel");
const { ErrorModel, ErrorItem } = require("../models/response/errorModel");
const GetConnectedUsersQuerier = require("../../BLL/queriers/user/getConnectedUsersQuerier");
const GetUserQuerier = require("../../BLL/queriers/user/getUserQuerier");

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
        this._app.get(this.prefix + "/:id", async(req, res) => {
            let id = req.params.id;
            var response = await self.GetUser(id);
            res.status(response.httpCode).send(response);
        });
    }

    async GetUserList() {
        let getConnectedUsersQuerier = new GetConnectedUsersQuerier();
        try {
            let result = await getConnectedUsersQuerier.execute();
            return new SuccessModel(result);
        } catch (err) {
            let errorItem = new ErrorItem("server.db", err.message);
            return new ErrorModel(500, [errorItem])
        }
    }

    async GetUser(id) {
        let getUserQuerier = new GetUserQuerier();
        try {
            let result = await getUserQuerier.execute(id);
            return new SuccessModel(result);
        } catch (err) {
            let errorItem = new ErrorItem("server.db", err.message);
            return new ErrorModel(500, [errorItem])
        }
    }
}