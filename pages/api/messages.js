import { connectToDatabase } from "../../lib/mongodb";

const handler = async (req, res) => {
  const { db } = await connectToDatabase();
  const messages = await db.collection("messages").find({}).limit(20).toArray();
  res.json(messages);
};

export default handler;
