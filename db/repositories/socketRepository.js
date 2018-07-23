module.exports = class SocketRepository {
    constructor(client) {
        this.client = client;
    }

    getBySocketId(id) {
        let params = [
            id
        ];
        const res = await client.query('SELECT * from user2sockets where socket_id = $1', params);
        return res.rows[0];
    }

    getByUserId(userId) {
        let params = [
            id
        ];
        const res = await client.query('SELECT * from user2sockets where user_id = $1', params);
        return res.rows;
    }

    add(socketId, userId) {
        let params = [
            socketId,
            userId
        ];

        await this.client.query('INSERT INTO user2sockets (socket_id, user_id) VALUES ($1, $2)', params);
    }

    remove(socketId) {
        let params = [
            socketId
        ];
        await this.client.query('DELETE from user2sockets where socket_id = $1', params);
    }
}