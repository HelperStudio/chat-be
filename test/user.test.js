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

var client1, client2, client3;

async function waitEmptyUserList(ms) {
    return new Promise(async(resolve, reject) => {
        var timerId = setInterval(async x => {
            var userList = await UserRequest.list();
            console.log("length", userList.body.length)
            if (userList.body.length == 0) {

                clearTimeout(timerId);
                resolve();
            }
        }, ms);
    })
}

function closeClient(client) {
    return new Promise((res, rej) => {
        if (client) {
            client.close();
        }
        res();
    })
}

beforeEach(async function() {
    this.timeout(7000);
    await Promise.all([closeClient(client1), closeClient(client2), closeClient(client3)]);
    await waitEmptyUserList(500);
});

it('should connect successfull', async() => {
    client1 = io.connect(socketUrl + "?id=" + chatUser1.name, options);
    client2 = io.connect(socketUrl + "?id=" + chatUser2.name, options);

    await Events.onconnect(client1);
    await Events.onconnect(client2);

    var res = await UserRequest.list();

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(2);
    expect(res.body).to.deep.include({ socketId: client1.id, userName: chatUser1.name });
    expect(res.body).to.deep.include({ socketId: client2.id, userName: chatUser2.name });
});


it('should disconnect successfull', async() => {
    client1 = io.connect(socketUrl + "?id=" + chatUser1.name, options);
    client2 = io.connect(socketUrl + "?id=" + chatUser2.name, options);

    await Events.onconnect(client1);
    await Events.onconnect(client2);

    var socketId = client1.id;

    await Promise.all([Events.onOffline(client2, socketId), closeClient(client1)]);
    var res = await UserRequest.list();
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
    expect(res.body).to.deep.include({ socketId: client2.id, userName: chatUser2.name });
}).timeout(7000);