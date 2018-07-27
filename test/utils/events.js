module.exports = class Events {
    static onconnect(client) {
        return new Promise((resolve, reject) => {
            client.on('connect', x => {
                console.log("EVENTS client connected successfully");
                resolve();
            });
        });
    }

    static onDisconnect(client) {
        return new Promise((resolve, reject) => {
            client.on('disconnect', x => {
                console.log("EVENTS client disconnected successfully");
                resolve();
            });
        });
    }

    static onOffline(client, socketId) {
        console.log("wait offlin for socketId", socketId)
        return new Promise((resolve, reject) => {
            client.on('offline', x => {
                console.log("EVENTS client offline successfully");
                if (x.socketId == socketId)
                    resolve();
            });
        });
    }

    static onOnline(client, userName) {
        console.log("wait online for ", userName)
        return new Promise((resolve, reject) => {
            client.on('online', x => {
                console.log("EVENTS client online", x);
                if (x.name == userName)
                    resolve(x);
            });
        });
    }

    static onMessage(client, userName) {
        return new Promise((resolve, reject) => {
            client.on('message', x => {
                if (x.from == userName)
                    resolve(x);
            });
        });
    }
}