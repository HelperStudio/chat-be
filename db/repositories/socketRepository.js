module.exports = class SocketRepository {
    constructor(client) {
        this.client = client;
    }

    async getBySocketId(id) {
        let params = [
            id
        ];
        const res = await this.client.query('SELECT * from user2sockets where socket_id = $1', params);
        if (res.rows.length == 0) {
            return null;
        } else {
            let data = res.rows[0];
            return {
                userId: data.user_id,
                socketId: data.socket_id
            }
        }
    }

    async getByUserId(userId) {
        let params = [
            userId
        ];
        const res = await this.client.query('SELECT * from user2sockets where user_id = $1', params);
        return res.rows.map(x => {
            return {
                userId: x.user_id,
                socketId: x.socket_id
            }
        });
    }

    async add(socketId, userId) {
        let params = [
            socketId,
            userId
        ];

        await this.client.query('INSERT INTO user2sockets (socket_id, user_id) VALUES ($1, $2)', params);
    }

    async remove(socketId) {
        let params = [
            socketId
        ];
        await this.client.query('DELETE from user2sockets where socket_id = $1', params);
    }
}