var SuccessModel = require("../models/response/successModel");
const { ErrorModel, ErrorItem } = require("../models/response/errorModel");
const GetRoomsQuerier = require("../../BLL/queriers/room/getRoomListQuerier");

module.exports = class RoomController {
    constructor(app) {
        this._app = app;
        this.prefix = "/rooms";
    }

    async initialize() {
        var self = this;

        this._app.get(this.prefix, async(req, res) => {
            var response = await self.GetRoomList();
            res.status(response.httpCode).send(response);
        });

    }

    async GetRoomList() {
        let getRoomsQuerier = new GetRoomsQuerier();
        try {
            let result = await getRoomsQuerier.execute();
            return new SuccessModel(result);
        } catch (err) {
            let errorItem = new ErrorItem("server.db", err.message);
            return new ErrorModel(500, [errorItem])
        }
    }
}