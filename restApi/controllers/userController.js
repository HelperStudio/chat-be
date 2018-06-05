var storage = require('../../storage/connectedUsers');

module.exports = class UserController {
    constructor(app) {
        this._app = app;
        this.prefix = "/users";
    }

    initialize() {
        this._app.get(this.prefix, function(req, res) {
            res.send(storage.users);
        });
    }
}