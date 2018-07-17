module.exports = class TokenRequestModel {
    constructor(code, clientId, clientSecret, redirectUri, grantType) {
        this.code = code;
        this.client_id = clientId;
        this.client_secret = clientSecret;
        this.redirect_uri = redirectUri;
        this.grant_type = grantType;
    }
}