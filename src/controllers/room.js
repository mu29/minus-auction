module.exports = new RoomController();

function RoomController() {
    var self = this;

    self.createRoom = (user, callback) => {
        // 방 만들기
        var room = {};
        room.name = user.name + "의 게임";
        room.start = false;
        room.users = [];
        room.users.push(user);
        global.rooms[room.name] = room;
        // 유저의 방
        user.room = room.name
    };

    self.joinRoom = (user, roomName, callback) => {
        global.rooms[roomName].users.push()
    };

    self.quitRoom = (user, callback) => {

    };

    self.isJoined = (token) => {
        if (token in global.users) {
            return true;
        }

        socket.emit("error", { message: "접속 후 이용해주세요" });
        return false;
    };

    self.registerHandler = (socket) => {
        socket.on("room_list", (packet) => {
            if (!self.isJoined(packet.token)) {
                return;
            }
            var roomList = [];
            for (var roomName in global.rooms) {
                roomList.push({
                    name: global.rooms[roomName].name,
                    start: global.rooms[roomName].start
                });
            }
            global.logger.info(global.rooms);
            global.logger.info(roomList);
            socket.emit("room_list", { rooms: roomList });
        });

        socket.on("create_room", (packet) => {
            if (!isJoined(token)) return;

            socket.emit("room_list", { rooms: global.rooms });
        });
    };
}
