import React from "react";
import ProfileCardFeed from "./Profile/ProfileCard";
import Notification from "./Notifications-section/notifications";
const LeftFeedSide = (props) => {
  return (
    <div className="profile-side rounded-lg p-[1em] overflow-handle">
      <ProfileCardFeed />
      {/* <Notification /> */}
    </div>
  );
};

export default React.memo(LeftFeedSide);
