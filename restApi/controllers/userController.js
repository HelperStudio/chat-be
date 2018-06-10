var storage = require('../../storage/connectedUsers');

module.exports = class UserController {
    constructor(app) {
        this._app = app;
        this.prefix = "/users";
    }

    initialize() {
        this._app.get(this.prefix, function(req, res) {
            console.log("API users", storage.users)
            res.send(storage.users);
        });
    }
}