module.exports = {

    users: [],

    addUser: function(user) {
        this.users.push(user);
    },

    removeUser: function(socketId) {
        this.users = this.users.filter(x => x.socketId == socketId)
    }
}