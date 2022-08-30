import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";

import { SocketContext } from "../store/context";
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
    axios
      .get("/api/messages")
      .then(res => setMessages(res.data))
      .catch(function (error) {
        console.log(error);
      });
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
