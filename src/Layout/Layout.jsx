import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../APIS/SocketContext";
import { createPortal } from "react-dom";
import NotificationPage from "../Feeds/Notifications-section/NotificationPage.jsx/NotificationPage";
import { useEffect } from "react";
import axios from "axios";
import GetUserName from "../APIS/getUserName";

const Layout = (props) => {
  const [StopSearch, setStopSearch] = useState(false);
  const socket = useContext(SocketContext);
  const [notification, setNotification] = useState([]);


  useEffect(() => {
    socket.on("friendRequestSent", (data) => {
      setNotification((prev) => [...prev, data]);
    });
    socket.on("commentMade", (data) => {
      setNotification((prev) => [...prev, data]);
    });
    socket.on("reactMade", (data) => {
      setNotification((prev) => [...prev, data]);
    });
    socket.on("friendRequestAccepted", (data) => {
      setNotification((prev) => [...prev, data]);
    });
  }, []);

  function setShowParent(param) {
    setStopSearch(param);
  }

  const notificationPortal = createPortal(
    notification.length > 0 && (
      <NotificationPage
        notification={notification}
        className={
          "fixed left-[1em] max-h-[60vh] md:right-[0em] max-w-[500px] bottom-[2em] pt-[0em]"
        }
      />
    ),
    document.getElementById("notification")
  );

  return (
    <>
      {notificationPortal}
      <div
        className="flex-grow flex flex-col"
        onClick={() => setStopSearch(true)}
      >
        <Header setShowParent={setShowParent} StopSearch={StopSearch} />
        <Outlet />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
