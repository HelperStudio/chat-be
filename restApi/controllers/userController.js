module.exports = class UserController {
    constructor(app) {
        this._app = app;
    }

    initialize() {
        this._app.get('/hello', function(req, res) {
            res.send('Hello World!');
        });
    }
}