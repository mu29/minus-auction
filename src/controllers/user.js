module.exports = new UserController();

function UserController() {
    var self = this;
    var Database = require('../models/database.js');
    var Models = require("../models/define.js");
    var User = Models.User;

    self.join = function(name, password, callback) {
        User.findOne({ where: { name: name } }).then((user) => {
            if (user == undefined) {
                register(name, password, callback);
                return;
            }
            user.password === password ? callback(user) : callback(null);
        })
        .catch((err) =>{
            global.logger.error(err);
            callback(null);
        });
    };

    self.register = function(name, password, callback) {
        User.insert({ name: name, password: password }).then((user) => {
            user === undefined ? callback(null) : callback(user);
        })
        .catch((err) => {
            global.logger.error(err);
            callback(null);
        });
    };

    self.registerHandler = function(socket) {
        
    }
}
