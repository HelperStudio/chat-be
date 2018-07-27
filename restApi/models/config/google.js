module.exports = class GoogleConfigModel {
    constructor(settings) {
        this.clientId = settings.clientId;
        this.clientSecret = settings.clientSecret;
        this.redirectUri = settings.redirectUri;
        this.grantType = settings.grantType;
    }
}