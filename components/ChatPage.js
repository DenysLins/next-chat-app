import { useState, useContext, useEffect } from "react";

import { SocketContext } from "../utils/context";
import styles from "../styles/ChatPage.module.css";

import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = () => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("messageResponse", data => {
        setMessages([...messages, data]);
      });
    }
  }, [socket, messages]);

  return (
    <div className={styles.chat}>
      <ChatBar socket={socket} />
      <div className={styles.chat__main}>
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
