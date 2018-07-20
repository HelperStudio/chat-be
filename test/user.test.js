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

var chatUser1 = { name: 'Tom', id: '1' };
var chatUser2 = { name: 'Sally', id: '2' };
var chatUser3 = { name: 'Dana', id: '3' };

var client1, client2, client3;

async function waitEmptyUserList(ms) {
    return new Promise(async(resolve, reject) => {
        var timerId = setInterval(async x => {
            let userListResponse = await UserRequest.list();
            let userList = userListResponse.body.data;
            if (userList.length == 0) {

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

function emit(client, msg) {
    return new Promise((res, rej) => {
        client.emit("message", msg);
        res();
    })
}

beforeEach(async function() {
    this.timeout(7000);
    await Promise.all([closeClient(client1), closeClient(client2), closeClient(client3)]);
    await waitEmptyUserList(500);
});

it('should connect successfull', async() => {
    client1 = io.connect(socketUrl + "?id=" + chatUser1.id + "&name=" + chatUser1.name, options);
    client2 = io.connect(socketUrl + "?id=" + chatUser2.id + "&name=" + chatUser2.name, options);

    await Events.onconnect(client1);
    await Events.onconnect(client2);

    let res = await UserRequest.list();
    let data = res.body.data;
    expect(res.statusCode).to.equal(200);
    expect(data).to.be.an('array');
    expect(data.length).to.equal(2);
    expect(data).to.deep.include({ socketId: client1.id, name: chatUser1.name, id: chatUser1.id });
    expect(data).to.deep.include({ socketId: client2.id, name: chatUser2.name, id: chatUser2.id });
});


it('should disconnect successfull', async() => {
    client1 = io.connect(socketUrl + "?id=" + chatUser1.id + "&name=" + chatUser1.name, options);
    client2 = io.connect(socketUrl + "?id=" + chatUser2.id + "&name=" + chatUser2.name, options);

    await Events.onconnect(client1);
    await Events.onconnect(client2);

    var socketId = client1.id;

    await Promise.all([Events.onOffline(client2, socketId), closeClient(client1)]);
    let res = await UserRequest.list();
    let data = res.body.data;
    expect(res.statusCode).to.equal(200);
    expect(data).to.be.an('array');
    expect(data.length).to.equal(1);
    expect(data).to.deep.include({ socketId: client2.id, name: chatUser2.name, id: chatUser2.id });
}).timeout(7000);

it('should receive event about new user connect', async() => {
    client1 = io.connect(socketUrl + "?id=" + chatUser1.id + "&name=" + chatUser1.name, options);
    await Events.onconnect(client1);

    client2 = io.connect(socketUrl + "?id=" + chatUser2.id + "&name=" + chatUser2.name, options);

    let res = await Promise.all([Events.onconnect(client2), Events.onOnline(client1, chatUser2.name)])

    expect(res[1]).to.deep.equal({ socketId: client2.id, name: chatUser2.name, id: chatUser2.id });
});

it('should receive message', async() => {
    client1 = io.connect(socketUrl + "?id=" + chatUser1.id + "&name=" + chatUser1.name, options);
    await Events.onconnect(client1);

    client2 = io.connect(socketUrl + "?id=" + chatUser2.id + "&name=" + chatUser2.name, options);
    await Events.onconnect(client2);

    var msg = { from: chatUser1.name, text: "test text" }


    var res = await Promise.all([Events.onMessage(client2, chatUser1.name), emit(client1, msg)])

    expect(res[0]).to.deep.equal(msg);
});