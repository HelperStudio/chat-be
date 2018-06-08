var request = require('supertest');
var app = require('../../index');

module.exports = class UserRequest {
    static list() {
        return new Promise((resolve, reject) => {
            request(app).get('/users')
                .end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    }
}