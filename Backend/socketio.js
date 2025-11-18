// socketio.js
const { Server } = require("socket.io");
const { UserOnline } = require("./Controller/message.controller");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://192.168.100.5:5173/",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // socket.on('online',UserOnline(data))
    socket.on('join-vendor-room',(data)=>{
      socket.join(data?.id)
      console.log('vendor has joined the room',data)
    })
    socket.on('customer message',(data)=>{
      console.log('customer message',data)
      io.to(data?.vendor_id).emit('receive message',data)
    })
  });

  return io;
}

module.exports = { initSocket };
