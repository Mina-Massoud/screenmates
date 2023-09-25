import React, { useEffect, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import Reacts from "./Reacts/Reacts";
import "animate.css";
import { Link } from "react-router-dom";
import defaultProfilePic from "../../../media/defaultProfilePic.jpg";
import TopReactsRender from "./Reacts/TopReacts";
import formatTimeAgo from "../../../helperalgo/datesAlgo";
import "video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
import isVideoLink from "../../../helperalgo/CheckIsPostVideo";
import DropDownPostsList from "./DropDownList/DropDownList";
import GetUserName from "../../../APIS/getUserName";
import EditPost from "./DropDownList/EditPost";
const Post = ({
  data,
  child = false,
  showingPostHandler,
  sendReactToParent,
}) => {
  const [userData, setUserData] = useState();
  const [showListButton, setShowListButton] = useState(
    data.publisher === GetUserName()
  );
  console.log("rendered");
  const [isPostDeleted, setIsPostDeleted] = useState();
  const [isPostEdited, setIsPostEdited] = useState();
  const [showDropDownList, setshowDropDownList] = useState(false);

  useEffect(() => {
    if (data.publisherData) setUserData(data.publisherData[0]);
    else setUserData(data.publisher);
  }, [data]);

  function reactChangesRealTimeEffect(data) {
    sendReactToParent(data);
  }

  if (!userData) {
    return <h1>loading...</h1>;
  }

  function isDeleted(param) {
    setIsPostDeleted(param);
  }

  function isEdit(param) {
    setshowDropDownList(false);
    setIsPostEdited(param);
  }

  function onCancel(param) {
    console.log(param);
    setIsPostEdited(false);
    if (param) {
      data.caption = param;
    }
  }

  console.log(data.caption);

  return (
    <>
      {!isPostDeleted && (
        <div className="flex flex-col bg-[#181818] p-[0.6em] rounded-lg animate__animated animate__zoomIn">
          <div className="top-post-side flex justify-between items-center pb-[1em]">
            <div className="publisher-info flex">
              <Link to={`/profile/${userData.userName}`}>
                <img
                  src={userData.imgURL ? userData.imgURL : defaultProfilePic}
                  className="w-[50px] h-[50px] object-cover rounded-full"
                  alt=""
                />
              </Link>

              <div className="info-tags ml-[1em]">
                <div className="flex">
                  <Link to={`/profile/${userData.userName}`}>
                    <p className="text-[#818181]">@{userData.userName}</p>
                  </Link>

                  <p className="ml-[0.5em]">
                    {formatTimeAgo(data.publishDate)}
                  </p>
                </div>
                <Link to={`/profile/${userData.userName}`}>
                  <h2 className="text-[1.2rem] capitalize font-black">
                    {userData.firstName} {userData.lastName}
                  </h2>
                </Link>
              </div>
            </div>
            <div className="mr-[1em] relative">
              {showListButton && (
                <IoIosArrowDropdown
                  size={25}
                  className="cursor-pointer text-gray-300 z-max"
                  onClick={() => {
                    setshowDropDownList((prev) => !prev);
                  }}
                />
              )}
              {showDropDownList && (
                <DropDownPostsList
                  isEdit={isEdit}
                  isDeleted={isDeleted}
                  id={data._id}
                />
              )}
            </div>
          </div>
          {isPostEdited ? (
            <EditPost
              Initialvalue={data.caption}
              postId={data._id}
              onCancel={onCancel}
            />
          ) : (
            data.caption && (
              <p className="post-content break-word text-[1.5rem] font-[500] border-y border-gray-600 py-[0.6em] text-[1.1rem]">
                {data.caption}
              </p>
            )
          )}
          <div
            style={{
              backgroundImage: `url(${data.mediaURL})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="img-with-filter-background rounded-lg w-full flex"
          >
            {data.mediaURL && (
              <div className="img-post bg-effect w-full">
                {isVideoLink(data.mediaURL) ? (
                  <Player height={200}>
                    <source style={{ height: "100px" }} src={data.mediaURL} />
                  </Player>
                ) : (
                  <img
                    className="my-[2em] w-fit mx-auto rounded-lg object-scale max-h-[500px]"
                    src={data.mediaURL}
                    alt="Preview"
                  />
                )}
              </div>
            )}
          </div>
          {data.reacts && (
            <TopReactsRender totalNumberOfReacts={data.reacts.length} />
          )}
          <div className="interactive flex justify-between items-center mt-[1em]">
            <Reacts
              reactChangesRealTimeEffect={reactChangesRealTimeEffect}
              reactType={data.userReact}
              id={data._id}
            />
            {!child && (
              <button
                className="bg-[#2f2f2f] p-2 rounded-lg"
                onClick={() => {
                  showingPostHandler(data._id);
                }}
              >
                Comments
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
