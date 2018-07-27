module.exports = class TokenRepository {
    constructor(client) {
        this.client = client;
    }

    async getByAccessToken(accessToken) {
        let params = [
            accessToken
        ];
        const res = await client.query('SELECT * from user2tokens where access_token = $1;', params);
        return res.rows[0];
    }

    async getByRefreshToken(refreshToken) {
        let params = [
            refreshToken
        ];
        const res = await client.query('SELECT * from user2tokens where refresh_token = $1;', params);
        return res.rows[0];
    }

    async add(userId, accessToken, refreshToken, expire) {
        let params = [
            userId,
            accessToken,
            refreshToken,
            expire
        ];

        await this.client.query('INSERT INTO user2tokens (user_id, access_token, refresh_token, expire) VALUES ($1, $2, $3, $4);', params);
    }

    async remove(accessToken) {
        let params = [
            accessToken
        ];
        await this.client.query('DELETE from user2sockets where access_token = $1;', params);
    }

    async removeAllByUserId(userId) {
        let params = [
            userId
        ];
        await this.client.query('DELETE from user2sockets where user_id = $1;', params);
    }
}