import { useState, useContext, useEffect, useRef } from "react";

import { SocketContext } from "../store/context";
import constants from "../utils/constants";
import styles from "../styles/ChatPage.module.css";

import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = () => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on("messageResponse", data => {
        setMessages([...messages, data]);
      });
    }
  }, [socket, messages]);

  useEffect(() => {
    function fetchMessages() {
      fetch(`${constants.SERVER_URL}/api`)
        .then(response => response.json())
        .then(data => setMessages(data.messages));
    }
    fetchMessages();
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chat}>
      <ChatBar socket={socket} />
      <div className={styles.chat__main}>
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
          socket={socket}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
