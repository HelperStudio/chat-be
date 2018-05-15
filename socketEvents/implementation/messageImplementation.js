var broadcastEventType = require("../../enums/broadcastEventType");

module.exports = class MessageImplementation {
    constructor(socket) {
        this.socket = socket;
    }

    message(model) {
        var data = {
            text: model.text,
            from: model.from,
            to: model.to
        };

        this.broadcast.emit(broadcastEventType.MESSAGE, data);
        this.emit(broadcastEventType.MESSAGE, data);
    }
}