module.exports = class RoomRepository {
    constructor(client) {
        this.client = client;
    }

    async getById(id) {
        const res = await this.client.query('SELECT * from rooms where id = $1;', [id]);
        if (res.rows.length == 0) {
            return null;
        } else {
            let data = res.rows[0];
            return {
                id: data.id,
                name: data.name,
                createUserId: data.create_user_id,
                createDate: data.create_date
            }
        }
    }

    async getAll() {
        const res = await this.client.query('SELECT * from rooms');
        return res.rows.map(x => {
            return {
                id: x.id,
                name: x.name,
                createUserId: x.create_user_id,
                createDate: x.create_date
            }
        });
    }

    async add(id, name, createUserId, createDate) {
        let params = [
            id,
            name,
            createUserId,
            createDate
        ];

        await this.client.query('INSERT INTO rooms (id, name, create_user_id, create_date) VALUES ($1, $2, $3, $4);', params);
    }

    async update(id, name) {
        let params = [
            name,
            id
        ];
        await this.client.query('UPDATE rooms SET name = $1 where id = $2;', params);
    }
}