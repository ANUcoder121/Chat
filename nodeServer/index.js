const io = require("socket.io")(8000);
const users = {};
io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    // console.log(`${name} joined the chat`);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
    console.log(name);
  });
  socket.on("send", (message) => {
    // Here socket.emit will send the signal to all the users currently present.
    // However, socket.broadcast.emit will send the signal to all users but the one just joined.
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("User-left", {
      message: message,
      name: users[socket.id],
    });
    delete users[socket.id];
  });
});
