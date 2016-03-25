module.exports = new RoomController();

function RoomController() {
    var self = this;

    self.createRoom = (user, callback) => {
        // 방 만들기
        room.name = user.name;
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
            global.logger.info("방 목록");
            if (!self.isJoined(packet.token)) {
                return;
            }
            global.logger.info("히익");
            var roomList = [];
            for (room in global.rooms) {
                roomList.push(room.name);
            }
            global.logger.info(roomList);
            socket.emit("room_list", { rooms: roomList });
        });

        socket.on("create_room", (packet) => {
            if (!isJoined(token)) return;

            socket.emit("room_list", { rooms: global.rooms });
        });
    };
}
