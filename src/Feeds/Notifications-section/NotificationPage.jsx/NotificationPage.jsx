import React from "react";
import Notification from "../notifications";
import NotificationCard from "../Notification Type/NotificationCard";
import classNames from "classnames";
import { useState } from "react";
import axios from "axios";
import GetUserName from "../../../APIS/getUserName";
const NotificationPage = ({ className, notification }) => {
  const [notificationFetching, setNotificationFetching] = useState();

  console.log(notificationFetching);

  className = classNames(
    `flex-grow flex flex-col ${
      notificationFetching && "pt-[6em]"
    } overflow-handle animate__animated animate__zoomIn`,
    className
  );

  if (notification === undefined) {
    axios
      .get(`http://localhost:8000/users/${GetUserName()}/notifications`)
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

  return (
    <div className={className}>
      <div className="w-full px-[0.5em] bg-[#111111] mx-auto rounded-lg flex flex-col py-[0.5em] gap-[5px]">
        {notification
          ? notification.map((child) => (
              <NotificationCard key={child._id} data={child} parent={true} />
            ))
          : notificationFetching && notificationFetching.notificationsData
          ? notificationFetching.notificationsData.map((child) => (
              <NotificationCard key={child._id} data={child} parent={true} />
            ))
          : null}{" "}
        {/* Return null instead of an empty string */}
      </div>
    </div>
  );
};

export default NotificationPage;
