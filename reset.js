const fs = require("fs");
const path = require("path");

const cleanMessages = async () => {
  const jsonDirectory = path.join(process.cwd(), "store");
  const messagesData = { messages: [] };
  const stringData = JSON.stringify(messagesData, null, 2);
  await fs.writeFile(jsonDirectory + "/messages.json", stringData, err => {
    console.error(err);
  });
};

cleanMessages();
