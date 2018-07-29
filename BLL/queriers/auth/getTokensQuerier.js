const { Pool } = require('pg')
const config = require('../../../configs/config').db;
const TokenRepository = require('../../../db/repositories/tokenRepository');

module.exports = class GetTokensQuerier {
    constructor() {}

    async execute(accessToken) {
        const pool = new Pool(config);
        const client = await pool.connect();
        try {
            let tokenRepository = new TokenRepository(client);
            let token = await tokenRepository.getByAccessToken(accessToken);
            return token;
        } finally {
            client.release()
        }
    }
}