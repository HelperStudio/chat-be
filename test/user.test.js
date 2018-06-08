var chai = require('chai');

var io = require('socket.io-client');
var config = require('../configs/config');
var Events = require('./utils/events');
var UserRequest = require('./requests/user.request');

var expect = chai.expect;

var socketUrl = 'http://localhost:' + config.port;

var options = {
    'force new connection': true
};

var chatUser1 = { name: 'Tom' };
var chatUser2 = { name: 'Sally' };
var chatUser3 = { name: 'Dana' };

it('should connect successfull', async() => {
    client1 = io.connect(socketUrl + "?id=" + chatUser1.name, options);
    client2 = io.connect(socketUrl + "?id=" + chatUser2.name, options);

    await Events.onconnect(client1);
    await Events.onconnect(client2);
    var res = await UserRequest.list();

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.deep.include({ socketId: client1.id, userName: chatUser1.name });
    expect(res.body).to.deep.include({ socketId: client2.id, userName: chatUser2.name });
});