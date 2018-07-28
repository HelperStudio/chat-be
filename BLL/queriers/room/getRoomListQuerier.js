const { Pool } = require('pg')
const config = require('../../../configs/config').db;
const RoomRepository = require('../../../db/repositories/roomRepository');

module.exports = class GetRoomListQuerier {
    constructor() {}

    async execute() {
        const pool = new Pool(config);
        const client = await pool.connect();
        try {
            let roomRepository = new RoomRepository(client);
            let rooms = roomRepository.getAll();
            return rooms;
        } finally {
            client.release()
        }
    }
}