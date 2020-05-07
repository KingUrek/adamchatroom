require("dotenv").config();
let express = require("express");
let mongoose = require("mongoose");
let messageSchema = require("./models/menssage");

//inicializando variáveis
let app = express();
let port = process.env.SERVER_PORT || 8080;
let server = app.listen(port, () => {
  console.log("listen to the port:" + port);
});
let onlineUsers = [];
let messageModel;

// app.use(express.static(__dirname + "/../build"));

//inicializando socket e banco de dados
let io = require("socket.io")(server);
mongoose
  .connect(process.env.MONGO_DB_PATH, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((err) => console.error(err))
  .then(() => {
    messageModel = mongoose.model("messageModel", messageSchema);
  });

io.on("connection", (socket) => {
  io.emit("user", onlineUsers);
  console.log("The socket " + socket.id + " connected");
  socket.on("send message", (data) => {
    console.log(data);
    io.to(data.room).emit("send message", data);
    let message = new messageModel({ ...data });
    message.save().then(() => console.log("New message was saved in db"));
  });
  socket.on("userON", (data) => {
    console.log("New User " + data.user);
    onlineUsers = onlineUsers.filter((e) => e.id !== data.id);
    onlineUsers.push(data);
    io.emit("user", onlineUsers);
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
    let savedMessages = await messageModel.find({ room: data }).exec();
    savedMessages.forEach((m) => io.to(data).emit("send message", m));
  });
});
