var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || "development";
var Config = require("../../config.json")[env];

module.exports = new Sequelize(Config.database, Config.username, Config.password, {
    host: Config.host,
    dialect: Config.dialect,
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
});
