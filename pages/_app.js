import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import axios from "axios";

import { SocketContext } from "../store/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    axios.get("/api/socket").then(() => {
      const socket = new socketIO();
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
