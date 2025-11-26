// socketio.js
const { Server } = require("socket.io");
const { UserOnline, customerMessage } = require("./Controller/message.controller");

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
      console.log('customer message data',data)
        customerMessage(data)
        console.log('data to emit is',data?.vendor_id)
      io.to(data?.vendor_id).emit('message-t-vendor',data)
    })
    socket.on('join-customer-room',(data)=>{
      socket.join(data?.id)
      console.log('customer has joined the room',data)
    })
    socket.on('vendor message',(data)=>{
      console.log('vendor message',data)
        customerMessage(data)
      io.to(data?.customer_id).emit('message-t-customer',data)
    })
  });

  return io;
}

module.exports = { initSocket };
