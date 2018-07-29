const { Pool } = require('pg');
const moment = require('moment');
const uuid = require('uuid/v4');
const config = require('../../../configs/config').db;
const RoomRepository = require('../../../db/repositories/roomRepository');
const TransationHelper = require('../../../db/transactionHelper');

module.exports = class DeleteRoomCommand {
    constructor() {}

    async execute(id) {
        const pool = new Pool(config);
        const client = await pool.connect();
        try {
            const transactionHelper = new TransationHelper(client);
            const roomRepository = new RoomRepository(client);
            await transactionHelper.execute(async() => {
                await roomRepository.delete(id);
            });
        } catch (err) {
            throw err;
        }
    }
}