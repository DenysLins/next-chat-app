import { Server } from "socket.io";
import { messageHandler } from "../../utils/socket";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", socket => {
    messageHandler(io, socket);
  });

  res.end();
};

export default SocketHandler;
