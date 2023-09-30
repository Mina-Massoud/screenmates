import React, { useReducer, useRef } from "react";
import NotificationCard from "./Notification Type/NotificationCard";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import GetUserName from "../../APIS/getUserName";
import InfiniteScroll from "react-infinite-scroll-component";

const Notification = (props) => {
  const [notification, setNotification] = useState([]);
  const [hasMoreState, setHasMoreState] = useState(true);
  const pageNumber = useRef(0);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    pageNumber.current = pageNumber.current + 1;
    console.log("Updated pageNumber:", pageNumber.current);
    console.log(
      `${
        import.meta.env.VITE_PORT
      }/users/${GetUserName()}/notifications?offest=${
        pageNumber.current
      }&limit=5`
    );
    if (pageNumber.current) {
      axios
        .get(
          `${
            import.meta.env.VITE_PORT
          }/users/${GetUserName()}/notifications?offset=${
            pageNumber.current
          }&limit=5`
        )
        .then((response) => {
          console.log(response);
          if (!response.data.notificationsData.length) {
            setHasMoreState(false);
            return;
          }
          setNotification((prev) => [
            ...prev,
            ...response.data.notificationsData,
          ]);
        })
        .catch((error) => {
          setHasMoreState(false);
          // Handle errors here
          console.error(error);
        });
    }
  }

  console.log(notification);

  if (!notification) {
    return;
  }

  return (
    <InfiniteScroll
      dataLength={notification.length}
      next={fetchData}
      hasMore={hasMoreState}
      scrollableTarget="left-side-scrollBar"
      loader={<h4>Loading...</h4>}
      className=" bg-[#282828] notifications-container mx-[0.2em] flex flex-col gap-[10px] p-[0.5em] rounded-lg"
    >
      <p className="text-[1.5rem] font-black">Notification</p>
      {notification && notification.length ? (
        notification.map((data) => {
          return <NotificationCard key={data._id} data={data} options={true} />;
        })
      ) : (
        <h1>No Notfications</h1>
      )}
    </InfiniteScroll>
  );
};

export default Notification;
