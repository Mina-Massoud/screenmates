import React, { useEffect } from "react";
import Notification from "../notifications";
import NotificationCard from "../Notification Type/NotificationCard";
import classNames from "classnames";
import { useState } from "react";
import axios from "axios";
import GetUserName from "../../../APIS/getUserName";
import notificationSound from "../../../media/sounds/notification.wav";

const NotificationPage = ({ className, notification, socket , deleteNotification }) => {
  const [notificationFetching, setNotificationFetching] = useState();

  className = classNames(
    `flex-grow flex flex-col ${
      notificationFetching && "pt-[6em]"
    } overflow-handle animate__animated animate__zoomIn`,
    className
  );

  if (notification === undefined) {
    axios
      .get(`${import.meta.env.VITE_PORT}/users/${GetUserName()}/notifications`)
      .then((response) => {
        console.log(response);
        setNotificationFetching(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }

  if (!notification && !notificationFetching) {
    return;
  }

  useEffect(() => {
    if (socket) {
      const notificationSoundAudio = new Audio(notificationSound);
      notificationSoundAudio.play();
    }
  }, []);

  return (
    <div className={className}>
      <div className="w-full px-[0.5em] bg-[#111111] mx-auto rounded-lg flex flex-col py-[0.5em] gap-[5px]">
        {notification
          ? notification.map((child) => (
              <NotificationCard
                deleteNotification={deleteNotification}
                key={child._id}
                data={child}
                parent={true}
              />
            ))
          : notificationFetching && notificationFetching.notificationsData
          ? notificationFetching.notificationsData.map((child) => (
              <NotificationCard
                deleteNotification={deleteNotification}
                key={child._id}
                data={child}
                parent={true}
              />
            ))
          : null}{" "}
        {/* Return null instead of an empty string */}
      </div>
    </div>
  );
};

export default NotificationPage;
