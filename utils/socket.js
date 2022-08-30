import { connectToDatabase } from "../lib/mongodb";

const messageHandler = (io, socket) => {
  socket.on("newUser", async data => {
    const { db } = await connectToDatabase();
    await db.collection("users").insertOne(data);
    const users = await db.collection("users").find({}).limit(20).toArray();
    io.emit("newUserResponse", users);
  });

  socket.on("message", async data => {
    const { db } = await connectToDatabase();
    await db.collection("messages").insertOne(data);
    io.emit("messageResponse", data);
  });

  socket.on("startTyping", data => {
    socket.broadcast.emit("userStartsTyping", data);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("userStopsTyping");
  });

  socket.on("disconnect", async () => {
    const { db } = await connectToDatabase();
    await db.collection("users").deleteOne({ socketID: socket.id });
    const users = await db.collection("users").find({}).limit(20).toArray();
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
};

export { messageHandler };
