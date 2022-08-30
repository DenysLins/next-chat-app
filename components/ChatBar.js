import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../styles/ChatBar.module.css";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("newUserResponse", data => {
        setUsers(data);
      });
    }
  }, [socket, users]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then(res => setUsers(res.data))
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.chat__sidebar}>
      <h2>Open Chat</h2>
      <div>
        <h4 className={styles.chat__header}>ACTIVE USERS</h4>
        <div className={styles.chat__users}>
          {users.map(user => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
