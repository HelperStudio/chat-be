const { Pool } = require('pg')
const config = require('../../../configs/config').db;

module.exports = class GetConnectedUsers {
    constructor() {}

    async execute() {
        const pool = new Pool(config);
        const client = await pool.connect();
        try {
            const query =
                `SELECT DISTINCT * FROM users as u
                JOIN user2sockets as u2s on u.id = u2s.user_id`;
            const res = await client.query(query);
            return res;
        } finally {
            client.release()
        }
    }
}