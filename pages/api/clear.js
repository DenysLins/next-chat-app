import path from "path";
import { promises as fs } from "fs";

const ApiHandler = async (req, res) => {
  const jsonDirectory = path.join(process.cwd(), "store");
  const messagesData = { messages: [] };
  const stringData = JSON.stringify(messagesData, null, 2);
  await fs.writeFile(
    jsonDirectory + "/messages.json",
    stringData + "\n",
    err => {
      console.error(err);
    }
  );
  res.status(200).json(JSON.parse(stringData));
};

export default ApiHandler;
