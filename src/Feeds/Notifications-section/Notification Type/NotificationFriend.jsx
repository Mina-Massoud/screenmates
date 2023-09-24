import React from "react";
import GetUserName from "../../../APIS/getUserName";
import { useState } from "react";
import axios from "axios";
const NotificationFriend = ({ causativeUser }) => {
  const [confimedStatus, setConfirmedStatus] = useState(false);

  function handleAcceptFriend() {
    setConfirmedStatus("sending");
    axios
      .post(`http://localhost:8000/users/${GetUserName()}/friends`, {
        friendUserName: causativeUser,
      })
      .then((response) => {
        setConfirmedStatus(true);
      })
      .catch((error) => {
        // Handle errors here
        setConfirmedStatus("error");
        console.error(error);
      });
  }

  return (
    <div className="info-friend gap-[20px] flex flex-col">
      <p>
        <strong className="tracking-wide">{causativeUser}</strong>{" "}
        {!confimedStatus
          ? "Send you a friend request"
          : confimedStatus === true &&
            `You and ${causativeUser} now become friends 🎉`}
      </p>
      {confimedStatus !== true && (
        <div className="flex">
          <button
            onClick={(event) => {
              event.preventDefault(); // Prevent navigation
              handleAcceptFriend();
            }}
            disabled={confimedStatus}
            className={`${
              !confimedStatus
                ? "main-text-gradient-background"
                : "border bg-transparent"
            } px-[1.5em] py-[0.5em] rounded-lg`}
          >
            {!confimedStatus
              ? "Confirm"
              : confimedStatus === "sending"
              ? "Validating..."
              : "Sorry we can't do this operation"}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationFriend;
