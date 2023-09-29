import React, { useEffect, useState } from "react";
import Mainfeed from "../../main-feed-content/mainFeed";
import About from "./About";
const ProfilePost = ({
  about,
  options,
  ParentShowingPostHandler,
  filter,
  userNameURL,
  forceRenderMainFeed,
  ableToCreate,
}) => {
  console.log("enterd 1 ", about);
  return (
    <>
      <div className="feeds col-start-2 col-end-3">
        <Mainfeed
          ParentShowingPostHandler={ParentShowingPostHandler}
          filter={filter}
          profile={true}
          userNameURL={userNameURL}
          forceRender={forceRenderMainFeed}
          ableToCreate={ableToCreate}
        />
      </div>
      <About options={options} aboutData={about} />
    </>
  );
};

export default ProfilePost;
