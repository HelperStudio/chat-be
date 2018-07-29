const { Pool } = require('pg');
const moment = require('moment');
const uuid = require('uuid/v4');
const config = require('../../../configs/config').db;
const RoomRepository = require('../../../db/repositories/roomRepository');
const TransationHelper = require('../../../db/transactionHelper');

module.exports = class CreateRoomCommand {
    constructor() {}

    async execute(name, createUserId) {
        const pool = new Pool(config);
        const client = await pool.connect();
        try {
            const transactionHelper = new TransationHelper(client);
            const roomRepository = new RoomRepository(client);
            let uid = uuid();
            await transactionHelper.execute(async() => {
                await roomRepository.add(
                    uid,
                    name,
                    createUserId,
                    moment.utc().format());
            });
            return uid;
        } catch (err) {
            throw err;
        }
    }
}