import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import GetUserName from "./getUserName";

const socket = io.connect("https://screenmates.onrender.com/", {
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
