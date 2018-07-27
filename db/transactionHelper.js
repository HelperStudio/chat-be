module.exports = class TransactionHelper {
    constructor(client) {
        this.client = client;
    }

    async execute(fn) {
        try {
            let result = null;
            await this.client.query('BEGIN')
            result = await fn();
            await this.client.query('COMMIT')
            return result;
        } catch (e) {
            await this.client.query('ROLLBACK')
            throw e;
        } finally {
            this.client.release();
        }
    }
}