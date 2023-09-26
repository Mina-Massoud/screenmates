import React, { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import defaultProfilePic from "../../../media/defaultProfilePic.jpg";
import "animate.css";
import formatTimeAgo from "../../../helperalgo/datesAlgo";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import NotificationFriend from "./NotificationFriend";
import NotificationFriendAccepted from "./NotificationFriendAccepted";
import NotificationReact from "./NotificationReact";
import NotficationsComment from "./NotificationComment";
import { useLocation } from "react-router-dom";

const NotificationCard = ({ parent = false, data, deleteNotification }) => {
  const [hover, setHover] = useState(false);
  const [close, setClose] = useState(false);
  const [closeEffect, setCloseEffect] = useState(false);
  const [date, setDate] = useState("Just now");
  const { pathname } = useLocation();

  useMemo(() => {
    setDate(formatTimeAgo(data.notificationDate));
  }, [data]);

  useEffect(() => {
    let closeDelay;
    if (!hover) {
      closeDelay = setTimeout(() => {
        setCloseEffect(true);
        setCloseHandler();
      }, 3000);
    }

    return () => {
      clearTimeout(closeDelay);
    };
  }, [hover]);

  function setCloseHandler() {
    setTimeout(() => {
      setClose(true);
    }, 200);
  }

  if (close) {
    return;
  }

  const pathType = data.postId ? "post" : "profile";

  function handleRemoveNotification() {
    setCloseEffect(true);
    setCloseHandler();
    deleteNotification(data._id);
  }
  console.log(data);
  return (
    <Link
      to={
        pathType === "post"
          ? `/feeds/post/${data.postId}`
          : `/profile/${data.causativeUser}`
      }
      state={pathname}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className={`notification-card animate__animated ${
        closeEffect ? "animate__fadeOut" : "animate__fadeIn"
      }  ${parent ? "w-full" : "max-w-[500px]"} md:min-w-[350px]`}
    >
      <div
        className={`p-[0.5em] pb-[1em] bg-[#08000e] relative hover:bg-[#111111] transition duration-300 justify-between flex flex-col ${
          parent ? "w-full" : "max-w-[500px]"
        }  rounded-lg`}
      >
        <AiFillCloseCircle
          className="ml-auto mb-[0.5em] cursor-pointer"
          onClick={() => {
            handleRemoveNotification();
          }}
          size={17}
        />
        <div className="left-side-friend-card flex ">
          <img
            className="min-w-[1px] main-text-gradient-background mr-[1em] aspect-square rounded-lg max-w-[50px] max-h-[50px] rounded-lg"
            src={
              data.userData.userImgURL
                ? data.userData.userImgURL
                : defaultProfilePic
            }
            alt="friend-img"
          />

          {data.notificationType === "friendRequest" ? (
            <NotificationFriend causativeUser={data.userData.userName} />
          ) : data.notificationType === "friendRequestAccepted" ? (
            <NotificationFriendAccepted
              causativeUser={data.userData.userName}
            />
          ) : data.notificationType === "reactMade" ? (
            <NotificationReact
              postId={data.postId}
              reactType={data.reactType}
              causativeUser={data.userData.userName}
            />
          ) : data.notificationType === "commentMade" ? (
            <NotficationsComment
              postId={data.postId}
              causativeUser={data.userData.userName}
            />
          ) : (
            ""
          )}
        </div>
        <p className="mt-[1em]">{date}</p>
      </div>
    </Link>
  );
};

export default NotificationCard;
