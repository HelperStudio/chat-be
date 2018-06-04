var UserController = require("./controllers/userController");

module.exports = class ControllerInitializer {
    constructor(app) {
        this._app = app;
    }

    initialize() {
        var userController = new UserController(this._app);

        userController.initialize();
    }
}