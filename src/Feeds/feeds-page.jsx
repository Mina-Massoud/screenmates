import React, { useEffect, useState } from "react";
import LeftFeedSide from "./LeftFeedSide";
import Mainfeed from "./main-feed-content/mainFeed";
import FriendsSide from "./friends-section/Friends-side";
import ReactLoading from "react-loading";
import "animate.css";
import { AiOutlineClose } from "react-icons/ai";
import PostDetails from "./main-feed-content/Posts-section/comments/PostDetails";
const Feeds = (props) => {
  const [showingPostDetails, setShowingPostDetails] = useState();
  const [forceRender, setForceRender] = useState(false);

  function ParentShowingPostHandler(data) {
    setShowingPostDetails(data);
  }

  function sendReactToParentFeeds(data) {
    setForceRender(data);
  }

  return (
    <div className="mt-[5.5em] mx-[0.5em] max-h-[100vh] flex-grow flex">
      {showingPostDetails && (
        <>
          <PostDetails
            sendReactToParentFeeds={sendReactToParentFeeds}
            id={showingPostDetails}
          />
          <AiOutlineClose
            onClick={() => {
              setShowingPostDetails(false);
            }}
            className="fixed cursor-pointer z-max border top-[2em] rounded-full p-[0.2em]"
            size={25}
          />
        </>
      )}
      <div className="main-feed-grid max-h-[91vh] flex-grow">
        <LeftFeedSide />
        <Mainfeed
          ParentShowingPostHandler={ParentShowingPostHandler}
          forceRender={forceRender}
        />
        <FriendsSide />
      </div>
    </div>
  );
};

export default React.memo(Feeds);
