var path = require('path');
var config = require('./configs/config');

var configuration = {
    migrationsDir: path.resolve(__dirname, 'migrations'),
    host: config.db.host,
    port: config.db.port,
    db: config.db.database,
    user: config.db.user,
    password: config.db.password
};

require('sql-migrations').run(configuration);