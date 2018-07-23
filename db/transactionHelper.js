module.exports = class TransactionHelper {
    constructor(client) {
        this.client = client;
    }

    execute(fn) {
        try {
            await client.query('BEGIN')
            fn();
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e;
        } finally {
            client.release();
        }
    }
}