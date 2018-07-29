const SuccessModel = require("../models/response/successModel");
const { ErrorModel, ErrorItem } = require("../models/response/errorModel");
const GetRoomsQuerier = require("../../BLL/queriers/room/getRoomListQuerier");
const CreateRoomCommand = require("../../BLL/commands/room/createRoomCommand");
const DeleteRoomCommand = require("../../BLL/commands/room/deleteRoomCommand");
const AuthValidator = require("../validators/authValidator");
const RoomValidator = require('../validators/roomValidator');

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

        this._app.post(this.prefix, async(req, res) => {
            let authResult = await AuthValidator.authCheck(req.headers.authorization);
            if (authResult instanceof SuccessModel) {
                let roomValidatorResult = RoomValidator.create(req.body);
                if (roomValidatorResult.errors.length == 0) {
                    var response = await self.CreateRoom(req.body.name, authResult.data.userId);
                    res.status(response.httpCode).send(response);
                } else {
                    res.status(roomValidatorResult.httpCode).send(roomValidatorResult);
                }

            } else {
                res.status(authResult.httpCode).send(authResult);
            }
        });

        this._app.delete(this.prefix + '/:id', async(req, res) => {
            let authResult = await AuthValidator.authCheck(req.headers.authorization);
            if (authResult instanceof SuccessModel) {
                var response = await self.DeleteRoom(req.params.id);
                res.status(response.httpCode).send(response);
            } else {
                res.status(authResult.httpCode).send(authResult);
            }
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

    async CreateRoom(name, userId) {
        let createRoomCommand = new CreateRoomCommand();
        try {
            let result = await createRoomCommand.execute(name, userId);
            return new SuccessModel(result);
        } catch (err) {
            let errorItem = new ErrorItem("server.db", err.message);
            return new ErrorModel(500, [errorItem])
        }
    }

    async DeleteRoom(id) {
        let deleteRoomCommand = new DeleteRoomCommand();
        try {
            let result = await deleteRoomCommand.execute(id);
            return new SuccessModel(result);
        } catch (err) {
            let errorItem = new ErrorItem("server.db", err.message);
            return new ErrorModel(500, [errorItem])
        }
    }


}