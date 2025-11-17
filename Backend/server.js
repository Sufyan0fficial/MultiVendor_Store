// server.js
const app = require('./app.js');
const DBConnection = require('./DB/connection.js');
const { initSocket } = require('./socketio.js');
const http = require("http");

if (process.env.NODE_ENV !== "Production") {
  require("dotenv").config({ path: "Config/.env" });
}

const server = http.createServer(app);  // express attached to HTTP server

process.on("uncaughtException", (error) => {
  console.log("Server is shutting down");
  console.log("err:", error.message);
});

const Start = async () => {
  try {
    await DBConnection(process.env.DB_STR);

    // Initialize socket.io on this server
    initSocket(server);

    server.listen(process.env.PORT, "0.0.0.0", () => {
      console.log(`Backend running at ${process.env.API_URL}`);
    });

  } catch (error) {
    console.log("Failed to start server");
    console.log("err:", error.message);
  }
};

Start();

module.exports = { server };
