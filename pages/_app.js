import { useEffect, useState } from "react";

import { SocketContext } from "../store/context";
import { initSocket } from "../utils/socket";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    initSocket().then(socket => {
      setSocket(socket);
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Component {...pageProps} />
    </SocketContext.Provider>
  );
}

export default MyApp;
