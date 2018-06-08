module.exports = class Events {
    static onconnect(client) {
        return new Promise((resolve, reject) => {
            client.on('connect', x => {
                console.log("client connected successfully");
                resolve();
            });
        });
    }
}