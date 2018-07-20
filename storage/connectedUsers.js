module.exports = {

    users: [],

    addUser: function(user) {
        this.users.push(user);
    },

    updateUsers: function(user) {
        var usersToUpdate = this.users.filter(x => x.id == user.id);
        for (var i = 0; i < usersToUpdate.length; i++) {
            usersToUpdate[i].picture = user.picture;
            usersToUpdate[i].name = user.name;
        }
    },

    removeUser: function(socketId) {
        var filtered = this.users.filter(x => x.socketId != socketId);
        console.log("filtered", filtered);
        this.users = filtered;
    }
}