var Sequelize = require('sequelize');
var db = require('./database.js');

var User = db.define('users', {
  index : {
    type : Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
      type: Sequelize.STRING,
      allowNull: false
  },
});

User.sync();

db.sync();

exports.User = User;
