module.exports = class UserRepository {
    constructor(client) {
        this.client = client;
    }

    getById(id) {
        const res = await client.query('SELECT * from users where id = $1', id);
        return res.rows;
    }

    add(id, name, picture, gender) {
        let params = [
            id,
            name,
            picture,
            gender
        ];

        await this.client.query('INSERT INTO users (id, name, picture, gender) VALUES ($1, $2, $3, $4)', params);
    }

    update(id, name, picture, gender) {
        let params = [
            name,
            picture,
            gender,
            id
        ];
        await this.client.query('UPDATE users SET name = $1, picture = $2, gender = $3 where id = $4', params);
    }
}