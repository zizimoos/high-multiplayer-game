import http from "http";
import express from "express";
import socketio from "socket.io";

const clientPath = `${__dirname}/../client`;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(clientPath));

server.listen(8080, () => {
  console.log("✅ connect server port : 8080");
});
server.on("error", (err) => {
  console.log("server error : ", err);
});

io.on("connection", (socket) => {
  console.log("someone connected");
  socket.emit("message", "Hi,everyone you are connected");
  socket.on("message", (text) => {
    io.emit("message", text);
  });
});
