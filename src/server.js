require("dotenv").config();
let express = require("express");
let mongoose = require("mongoose");
let messageSchema = require("./models/menssage");
let roomSchema = require("./models/room");

//inicializando variáveis
let app = express();
let port = process.env.PORT || 8080;
let server = app.listen(port, () => {
  console.log("listen to the port:" + port);
});
let onlineUsers = [];
let messageModel, roomModel;

app.use(express.static(__dirname + "/../build"));

//inicializando socket e banco de dados
let io = require("socket.io")(server);
mongoose
  .connect(process.env.MONGO_DB_PATH, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((err) => console.error(err))
  .then(() => {
    console.log('mongodb is connected')
    messageModel = mongoose.model("messageModel", messageSchema);
    roomModel = mongoose.model("roomModel", roomSchema);
  });

io.on("connection", (socket) => {
  console.log("The socket " + socket.id + " connected");
  socket.on("send message", (data) => {
    console.log(data)
    io.to(data.room.id).emit("send message", data);
    let message = new messageModel({ ...data });
    message.save().then(() => console.log("New message was saved in db"));
  });
  socket.on("userON", async (data) => {
    console.log("New User: " + data.user);
    onlineUsers = onlineUsers.filter((e) => e.id !== data.id);
    onlineUsers.push(data);
    io.emit("user", onlineUsers);
    let rooms = await roomModel.find({}).exec();
    rooms.forEach((room) => io.emit("add_room", room))

  });
  socket.on("disconnect", () => {
    console.log("User " + socket.id + " has disconnected");
    onlineUsers = onlineUsers.filter((e) => e.id !== socket.id);
    io.emit("user", onlineUsers);
  });
  socket.on("join", async (data) => {
    socket.join(data, () => {
      console.log("The user (" + socket.id + ") is in the room: " + data);
    });
    const userIndex = onlineUsers.findIndex(usr => usr.id === socket.id)
    let updatedUser = { ...onlineUsers[userIndex], roomID: data }
    onlineUsers.splice(userIndex, 1, updatedUser)
    io.emit("user", onlineUsers);

    let savedMessages = await messageModel.find({ "room.id": data }).exec();
    io.to(data).emit("change_messages", savedMessages)

  });

  socket.on('create_room', (data) => {
    console.log('New Room: ' + data.name)
    io.emit("add_room", data)
    let room = new roomModel({ ...data });
    room.save().then('New room in the db')

  })

});
