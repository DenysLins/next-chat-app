import { useState, useEffect } from "react";

import styles from "../styles/ChatFooter.module.css";
import checkPageStatus from "../utils/functions";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = e => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id
      });
    }
    checkPageStatus(message, localStorage.getItem("userName"));
    setMessage("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      socket.emit("stopTyping");
    }, 1000);

    return () => clearTimeout(timer);
  }, [socket, message]);

  const handleStartTyping = e => {
    socket.emit("startTyping", `${localStorage.getItem("userName")} is typing`);
  };

  return (
    <div className={styles.chat__footer}>
      <form className={styles.form} onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className={styles.message}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={() => handleStartTyping()}
        />
        <button className={styles.sendBtn}>SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
