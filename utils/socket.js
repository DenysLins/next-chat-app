import socketIO from "socket.io-client";
import constants from "./constants";

let users = [];

const messageHandler = (io, socket) => {
  console.log(`${socket.id} connected!`);

  socket.on("newUser", data => {
    users.push(data);
    console.log(users);
    io.emit("newUserResponse", users);
  });

  socket.on("message", data => {
    io.emit("messageResponse", data);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected!`);
    users = users.filter(user => user.socketID !== socket.id);
    console.log(users);
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
};

const initSocket = async () => {
  await fetch(constants.SOCKET_PATH);
  const socket = socketIO();

  socket.on("connect", () => {
    console.log("Socket Connected!");
  });

  return socket;
};

export { messageHandler, initSocket };
