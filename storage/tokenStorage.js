module.exports = {

    tokens: {},

    addToken: (token) => {
        if (!this.tokens[token.accessToken]) {
            this.tokens[token.accessToken] = token;
        }
    },

    removeToken: (token) => {
        this.tokens[token.accessToken] = null;
    },

    getByAccessToken: (accessToken) => {
        return this.tokens[token.accessToken];
    }
}