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
    console.log("current socket attached is", socket.id);
    socket.on('customer_online',UserOnline(data))
    socket.on('send message',(data)=>{
      socket.join(data?.vendor_id)
      io.to(data.vendor_id).emit
    })
  });

  return io;
}

module.exports = { initSocket };
