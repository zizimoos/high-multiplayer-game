import http from "http";
import express from "express";
import socketio from "socket.io";
import RpsGame from "./rps-game";

const clientPath = `${__dirname}/../client`;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let waitingPlayer = null;

app.use(express.static(clientPath));

server.listen(8080, () => {
  console.log("✅ connect server port : 8080");
});
server.on("error", (err) => {
  console.log("server error : ", err);
});

io.on("connection", (socket) => {
  if (!waitingPlayer) {
    //start game
    waitingPlayer = socket;
    waitingPlayer.emit("message", "waiting for an oppenent");
  } else {
    new RpsGame(waitingPlayer, socket);
    waitingPlayer = null;
  }
  socket.emit("message", "Hi,everyone you are connected");
  socket.on("message", (text) => {
    io.emit("message", text);
  });
});
