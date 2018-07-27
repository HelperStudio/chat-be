const { Pool } = require('pg')
const config = require('../../../configs/config').db;
const SocketRepository = require('../../../db/repositories/socketRepository');
const TransationHelper = require('../../../db/transactionHelper');

module.exports = class ConnectUserCommand {
    constructor() {}

    async execute(socketId, userId) {
        const pool = new Pool(config);
        const client = await pool.connect();
        try {
            const transactionHelper = new TransationHelper(client);
            const socketRepository = new SocketRepository(client);
            await transactionHelper.execute(async() => {
                await socketRepository.add(socketId, userId);
            })
        } catch (err) {
            throw err;
        }
    }
}