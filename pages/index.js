import { useState, useContext } from "react";
import { useRouter } from "next/router";

import { SocketContext } from "../utils/context";
import styles from "../styles/Home.module.css";

export default function Home() {
  const socket = useContext(SocketContext);
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    router.push("/chat");
  };

  return (
    <form className={styles.home__container} onSubmit={handleSubmit}>
      <h2 className={styles.home__header}>Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className={styles.username__input}
        value={userName}
        onChange={e => setUserName(e.target.value)}
        required
      />
      <button className={styles.home__cta}>SIGN IN</button>
    </form>
  );
}
