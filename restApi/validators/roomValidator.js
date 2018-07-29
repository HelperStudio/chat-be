var RoomModel = require('../models/request/roomModel');
const { ErrorModel, ErrorItem } = require('../models/response/errorModel');

module.exports = class RoomValidator {
    static create(roomModel) {
        var roomModel = new RoomModel(roomModel);
        var errors = [];
        if (!roomModel.name)
            errors.push(new ErrorItem("bad_parameter.name", "name must be specified"));
        var res = new ErrorModel(409, errors);
        if (errors.length = 0) {
            res.httpCode = 200;
        }
        return res;
    }
}