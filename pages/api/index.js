import path from "path";
import { promises as fs } from "fs";

const ApiHandler = async (req, res) => {
  const jsonDirectory = path.join(process.cwd(), "store");
  const fileContents = await fs.readFile(
    jsonDirectory + "/messages.json",
    "utf8"
  );
  res.status(200).json(JSON.parse(fileContents));
};

export default ApiHandler;
