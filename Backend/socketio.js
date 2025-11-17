// socketio.js
const { Server } = require("socket.io");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://192.168.100.5:5173/",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("current socket attached is", socket.id);
    socket.on('send_message',(data)=>console.log(data))
    socket.emit('reply','by')
  });

  return io;
}

module.exports = { initSocket };
