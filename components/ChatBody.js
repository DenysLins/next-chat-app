import { useRouter } from "next/router";

import styles from "../styles/ChatBody.module.css";
const ChatBody = ({ messages }) => {
  const router = useRouter();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    router.push("/").then(() => {
      router.reload();
    });
  };

  return (
    <>
      <header className={styles.chat__mainHeader}>
        <p>Hangout with Colleagues</p>
        <button className={styles.leaveChat__btn} onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className={styles.message__container}>
        {messages.map(message =>
          message.name === localStorage.getItem("userName") ? (
            <div className={styles.message__chats} key={message.id}>
              <p className={styles.sender__name}>You</p>
              <div className={styles.message__sender}>
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className={styles.message__chats} key={message.id}>
              <p>{message.name}</p>
              <div className={styles.message__recipient}>
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className={styles.message__status}>
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
