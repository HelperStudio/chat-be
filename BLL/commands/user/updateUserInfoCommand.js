const { Pool } = require('pg')
const config = require('../../../configs/config').db;
const UserRepository = require('../../../db/repositories/userRepository');
const TransationHelper = require('../../../db/transactionHelper');

module.exports = class UpdateUserInfoCommand {
    constructor() {}

    async execute(userId, name, picture, gender) {
        const pool = new Pool(config);
        const client = await pool.connect();
        try {
            const transactionHelper = new TransationHelper(client);
            const userRepository = new UserRepository(client);
            await transactionHelper.execute(async() => {
                await userRepository.update(userId, name, picture, gender);
            })
        } finally {
            client.release()
        }
    }
}