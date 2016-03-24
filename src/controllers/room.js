module.exports = new RoomController();

function RoomController() {
    var self = this;

    self.createRoom = (user, callback) => {
        // 방 만들기
        room.name = user.name;
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
        if (packet.token in global.users) {
            return true;
        }

        socket.emit("error", { message: "접속 후 이용해주세요" });
        return false;
    };

    self.registerHandler = (socket) => {
        socket.on("room_list", (packet) => {
            if (!isJoined(token)) return;
            socket.emit("room_list", { rooms: global.rooms });
        });

        socket.on("create_room", (packet) => {
            if (!isJoined(token)) return;

            socket.emit("room_list", { rooms: global.rooms });
        });
    };
}
