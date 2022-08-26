import { Server } from "socket.io";
import { messageHandler } from "../../utils/socket";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running!");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", socket => {
    messageHandler(io, socket);
  });

  console.log("Socket is initializing!");
  res.end();
};

export default SocketHandler;
