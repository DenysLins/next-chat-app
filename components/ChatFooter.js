import { useState } from "react";

import styles from "../styles/ChatFooter.module.css";

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
    setMessage("");
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
        />
        <button className={styles.sendBtn}>SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
