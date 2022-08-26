import socketIO from "socket.io-client";
import path from "path";
import { promises as fs } from "fs";

import constants from "./constants";

let users = [];

const messageHandler = (io, socket) => {
  socket.on("newUser", data => {
    users.push(data);
    io.emit("newUserResponse", users);
  });

  socket.on("message", async data => {
    const jsonDirectory = path.join(process.cwd(), "store");
    const fileContents = await fs.readFile(
      jsonDirectory + "/messages.json",
      "utf8"
    );
    const messagesData = JSON.parse(fileContents);
    messagesData["messages"].push(data);
    const stringData = JSON.stringify(messagesData, null, 2);
    await fs.writeFile(jsonDirectory + "/messages.json", stringData, err => {
      console.error(err);
    });
    io.emit("messageResponse", data);
  });

  socket.on("startTyping", data => {
    socket.broadcast.emit("userStartsTyping", data);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("userStopsTyping");
  });

  socket.on("disconnect", () => {
    users = users.filter(user => user.socketID !== socket.id);
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
};

const initSocket = async () => {
  await fetch(constants.SOCKET_PATH);
  const socket = socketIO();
  return socket;
};

export { messageHandler, initSocket };
