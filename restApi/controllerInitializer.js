var UserController = require("./controllers/userController");
var AuthController = require("./controllers/authController");
var RoomController = require("./controllers/roomController");

module.exports = class ControllerInitializer {
    constructor(app) {
        this._app = app;
    }

    initialize() {
        var userController = new UserController(this._app);
        var authController = new AuthController(this._app);
        var roomController = new RoomController(this._app);

        userController.initialize();
        authController.initialize();
        roomController.initialize();
    }
}