const { Pool } = require('pg')
const config = require('../../../configs/config').db;

module.exports = class GetConnectedUsersQuerier {
    constructor() {}

    async execute() {
        const pool = new Pool(config);
        const client = await pool.connect();
        try {
            const query =
                `SELECT DISTINCT u.* FROM users as u
                JOIN user2sockets as u2s on u.id = u2s.user_id`;
            const res = await client.query(query);
            return res.rows;
        } finally {
            client.release()
        }
    }
}