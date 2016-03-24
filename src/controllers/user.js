module.exports = new UserController();

function UserController() {
    var self = this;
    var Database = require('../models/database.js');
    var Models = require("../models/define.js");
    var User = Models.User;

    self.login = (name, password, callback) => {
        // 아이디, 비번 체크
        if (name === "" || password === "") {
            callback(null);
            return;
        }

        User.findOne({ where: { name: name } }).then((user) => {
            if (user == undefined) {
                self.register(name, password, callback);
                return;
            }
            user.password === password ? callback(user) : callback(null);
        })
        .catch((err) =>{
            global.logger.error(err);
            callback(null);
        });
    };

    self.register = (name, password, callback) => {
        User.build({ name: name, password: password }).save()
        .then((user) => {
            user === undefined ? callback(null) : callback(user);
        })
        .catch((err) => {
            global.logger.error(err);
            callback(null);
        });
    };

    self.registerHandler = (socket) => {
        socket.on("join", (packet) => {
            self.login(packet.name, packet.password, (user) => {
                var success = user !== null;
                if (success) {
                    var token = user.name + "mm";
                    global.users[token] = user;
                }
                socket.emit("join", { success: success, token: token });
            });
        });
    };
}
