module.exports = {

    users: [],

    addUser: function(user) {
        this.users.push(user);
    },

    removeUser: function(socketId) {
        var filtered = this.users.filter(x => x.socketId != socketId);
        console.log("filtered", filtered);
        this.users = filtered;
    }
}