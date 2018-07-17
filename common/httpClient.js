const https = require('https');
const url = require('url');
var querystring = require('querystring');

module.exports = class HttpClient {
    constructor(host, port) {
        if (!host) {
            throw "HttpClient must have host";
        }
        this.host = host;
        this.port = port ? port : 443;
    }

    getBaseUrl() {
        return this.host + ((!this.port || this.port == 80 || this.port == 443) ? "" : this.port);
    }

    get(url) {
        var self = this;
        return new Promise((resolve, reject) => {

            var options = {
                hostname: this.host,
                port: this.port,
                path: url,
                method: 'GET',
                headers: {}
            };

            var req = https.request(options, (res) => {
                let data = '';
                console.log('statusCode:', res.statusCode);

                res.on('data', (d) => {
                    data += d;
                });

                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });

            req.on('error', (e) => {
                reject(e);
            });

            req.end();
        });
        /* return new Promise((resolve, reject) => {
            var fullUrl = url.resolve(self.getBaseUrl(), uri);
            https.get(fullUrl, (resp) => {
                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. 
                resp.on('end', () => {
                    resolve(JSON.parse(data));
                });

            }).on("error", (err) => {
                reject(err);
            })
        }); */
    }
    post(url, body, contentType) {
        let data = ''
        contentType = contentType ? contentType : 'application/json';

        return new Promise((resolve, reject) => {
            var postData = '';
            if (contentType == 'application/json') {
                postData = JSON.stringify(body);
            } else {
                postData = querystring.stringify(body);
            }

            var options = {
                hostname: this.host,
                port: this.port,
                path: url,
                method: 'POST',
                headers: {
                    'Content-Type': contentType,
                    'Content-Length': postData.length
                }
            };

            var req = https.request(options, (res) => {
                console.log('statusCode:', res.statusCode);

                res.on('data', (d) => {
                    data += d;
                });

                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });

            req.on('error', (e) => {
                reject(e);
            });

            req.write(postData);
            req.end();
        });
    }
}