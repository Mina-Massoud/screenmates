import React from "react";

const NotificationFriendAccepted = ({ causativeUser }) => {
  return (
    <div className="info-friend  gap-[20px] flex flex-col">
      <p>
        <strong className="tracking-wide"> You and {causativeUser} now become friends 🎉🎉</strong>
      </p>
    </div>
  );
};

export default NotificationFriendAccepted;
