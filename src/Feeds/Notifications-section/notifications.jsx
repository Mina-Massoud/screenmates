import React from "react";
import NotificationCard from "./Notification Type/NotificationCard";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import GetUserName from "../../APIS/getUserName";
const Notification = (props) => {
  const [notification, setNotification] = useState();

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/users/${GetUserName()}/notifications`)
  //     .then((response) => {
  //       setNotification(response.data);
  //     })
  //     .catch((error) => {
  //       // Handle errors here
  //       console.error(error);
  //     });
  // }, []);

  if (!notification) { 
    return
  }

  console.log(notification);

  return (
    <div className=" bg-[#282828] notifications-container mx-[0.2em] flex flex-col gap-[10px] p-[0.5em] rounded-lg">
      <p className="text-[1.5rem] font-black">Notification</p>
      {notification && notification.notificationsData.length ? (
        notification.notificationsData.map((data) => {
          return <NotificationCard data={data} />;
        })
      ) : (
        <h1>No Notfications</h1>
      )}
    </div>
  );
};

export default Notification;
