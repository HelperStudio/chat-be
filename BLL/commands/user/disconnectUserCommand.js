const { Pool } = require('pg')
const config = require('../../../configs/config').db;
const SocketRepository = require('../../../db/repositories/socketRepository');
const TransationHelper = require('../../../db/transactionHelper');

module.exports = class DisconnectUserCommand {
    constructor() {}

    async execute(socketId) {
        const pool = new Pool(config);
        const client = await pool.connect();
        try {
            const transactionHelper = new TransationHelper(client);
            const socketRepository = new SocketRepository(client);
            let userSocket = await socketRepository.getBySocketId(socketId);
            if (!userSocket) {
                return;
            } else {
                await transactionHelper.execute(async() => {
                    await socketRepository.remove(socketId);
                });
                let userSockets = await socketRepository.getByUserId(userSocket.socketId);
                if (userSockets.length == 0) {
                    return userSocket.userId
                } else {
                    return null;
                }
            }
        } catch (err) {
            throw err;
        }
    }
}