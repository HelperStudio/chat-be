module.exports = class AuthModel {
    constructor(tokenModel, userModel) {
        this.token = tokenModel;
        this.user = userModel;
    }
}