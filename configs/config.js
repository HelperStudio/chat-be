var env = process.env.node_env;
var configPath = env ? "./" + env + ".config.json" : "./config.json";
var config = require(configPath);
console.log("CONFIG:", config);
module.exports = config;