import { createContext } from "react";
import { io } from "socket.io-client";
import GetUserName from "./getUserName";

const socket = io.connect(`${import.meta.env.VITE_PORT}/`, {
  query: {
    userName: GetUserName(),
  },
});

const SocketContext = createContext();
export default function SocketContextHandle({ children }) {
  return (
    <>
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </>
  );
}

export { SocketContext };
