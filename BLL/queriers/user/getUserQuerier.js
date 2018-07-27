const { Pool } = require('pg')
const config = require('../../../configs/config').db;
const UserRepository = require('../../../db/repositories/userRepository');

module.exports = class GetUserQuerier {
    constructor() {}

    async execute(id) {
        const pool = new Pool(config);
        const client = await pool.connect();
        try {
            let userRepository = new UserRepository(client);
            let user = userRepository.getById(id);
            return user;
        } finally {
            client.release()
        }
    }
}