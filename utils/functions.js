import constants from "../utils/constants";

export default function checkPageStatus(message, user) {
  if (user !== localStorage.getItem("userName")) {
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications!");
    } else if (Notification.permission === "granted") {
      sendNotification(message, user);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission(permission => {
        if (permission === "granted") {
          sendNotification(message, user);
        }
      });
    }
  }
}

function sendNotification(message, user) {
  document.onvisibilitychange = () => {
    if (document.hidden) {
      const notification = new Notification("New message from Open Chat", {
        icon: `${constants.SERVER_URL}/733585.png`,
        body: `@${user}: ${message}`
      });
      notification.onclick = () =>
        function () {
          window.open(`${constants.SERVER_URL}/chat`);
        };
    }
  };
}
