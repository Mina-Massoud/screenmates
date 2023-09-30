import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { SocketContext } from "../APIS/SocketContext";
import { useContext } from "react";
const FeedsLayout = (props) => {
  const socket = useContext(SocketContext);

  if (!socket.connected) {
    socket.connect();
  }
  return (
    <div className="overflow-none flex flex-grow max-h-[100vh]">
      {/* <Header /> */}
      <Outlet />
    </div>
  );
};

export default FeedsLayout;
