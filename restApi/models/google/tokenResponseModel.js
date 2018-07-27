module.exports = class TokenResponseModel {
    constructor(data) {
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.expiresIn = data.expires_in;
        this.tokenType = data.token_type;
    }
}