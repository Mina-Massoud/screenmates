import React, { useState, useEffect } from "react";
import defaultCoverImg from "../../media/defaultCoverImg.jpg";
import ProfileBar from "./ProfileBar";
import ReactLoading from "react-loading";
import axios from "axios";
import defaultProfilePic from "../../media/defaultProfilePic.jpg";
import { AiFillCamera } from "react-icons/ai";
import { useParams } from "react-router-dom";
import GetUserName from "../../APIS/getUserName";
import ProfilePost from "./Profile-details-type/ProfilePost";
import PostDetails from "../main-feed-content/Posts-section/comments/PostDetails";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const ProfilePage = (props) => {
  const [userData, setUserData] = useState();
  const [coverImg, setCoverImg] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [AddFriend, setAddFriend] = useState(false);
  const [ConfirmFriend, setConfirmFriend] = useState(false);
  const [CancelFriend, setCancelFriend] = useState(false);
  const [Filter, setFilter] = useState("");
  const param = useParams();
  const [userNameURL, setUserNameURL] = useState(param.id);
  const CurrentUser = GetUserName();
  const [options, setOptions] = useState(false);
  const [showingPostDetails, setShowingPostDetails] = useState();
  const [closingPostDetails, setCLosingPostDetails] = useState();
  const [forceRenderMainFeed, setForceRenderMainFeed] = useState(false);
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate();
  function sendReactToParentFeeds(data) {
    setForceRenderMainFeed(data);
  }
  useEffect(() => {
    setOptions(userNameURL === GetUserName());
  }, [userNameURL]);

  useEffect(() => {
    setUserNameURL(param.id);
  }, [param.id]);

  useEffect(() => {
    setCancelFriend(false);
    setAddFriend(false);
    setConfirmFriend(false);

    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_PORT}/users/${userNameURL}?req=${GetUserName()}`
      )
      .then(function (response) {
        // handle success
        setUserData(response.data[0]);
        setLoading(false);
        const { friendshipStatus } = response.data[0];
        if (friendshipStatus === "friend") {
          showCancelFriendBtn(true);
        } else if (friendshipStatus === "requested") {
          showFriendRequestBtn(true);
        } else if (friendshipStatus === "notConfirmed") {
          showConfirmFriendBtn(true);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [coverImg, profilePicture, userNameURL]);

  function CoverWidget() {
    var myCropWidget = cloudinary.createUploadWidget(
      {
        cloudName: "dik65evmf",
        uploadPreset: "z9w9zvet",
        folder: "widgetUpload",
        cropping: true,
        resourceType: "image",
        accept: "image/*", // This line specifies that only image files are accepted.
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          if (result.info.resource_type === "image") {
            axios
              .put(`${import.meta.env.VITE_PORT}/users/${userNameURL}`, {
                coverURL: result.info.url,
              })
              .then((response) => {
                // Handle the response here
                console.log(response);
                setCoverImg(response.data.coverURL);
              })
              .catch((error) => {
                // Handle errors here
                console.error(error);
              });
          }
        }
      }
    );

    return myCropWidget;
  }

  function ProfilePicWidget() {
    var myCropWidget = cloudinary.createUploadWidget(
      {
        cloudName: "dik65evmf",
        uploadPreset: "z9w9zvet",
        folder: "widgetUpload",
        cropping: true,
        resourceType: "image",
        accept: "image/*", // This line specifies that only image files are accepted.
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          if (result.info.resource_type === "image") {
            axios
              .put(`${import.meta.env.VITE_PORT}/users/${userNameURL}`, {
                imgURL: result.info.url,
              })
              .then((response) => {
                // Handle the response here
                console.log(response);
                setProfilePicture(response.data.imgURL);
              })
              .catch((error) => {
                // Handle errors here
                console.error(error);
              });
          }
        }
      }
    );

    return myCropWidget;
  }

  // CreateWidget
  const myCropWidgetProfile = ProfilePicWidget();
  const myCropWidgetCover = CoverWidget();

  // function open Widgets
  function openProfileWidget() {
    myCropWidgetProfile.open();
  }

  function OpenCoverWidget() {
    myCropWidgetCover.open();
  }

  function showFriendRequestBtn(param = false) {
    if (!param) {
      setAddFriend((prev) => !prev);
    } else setAddFriend(true);
  }

  function showConfirmFriendBtn(param = false) {
    if (!param) {
      setConfirmFriend((prev) => !prev);
    } else setConfirmFriend(true);
  }

  function showCancelFriendBtn(param = false) {
    if (!param) {
      setCancelFriend((prev) => !prev);
    } else setCancelFriend(true);
  }

  // Friend APIS
  function handeSendRequest() {
    axios
      .post(
        `${import.meta.env.VITE_PORT}/users/${userNameURL}/friendRequests`,
        {
          friendUserName: CurrentUser,
        }
      )
      .then((response) => {
        // Handle the response here
        showFriendRequestBtn();
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }

  function handleDeleteFriend() {
    axios
      .delete(
        `${
          import.meta.env.VITE_PORT
        }/users/${userNameURL}/friends/${CurrentUser}`
      )
      .then((response) => {
        // Handle the response here
        showCancelFriendBtn();
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }

  function handleDeleteRequest() {
    axios
      .delete(
        `${
          import.meta.env.VITE_PORT
        }/users/${userNameURL}/friendRequests/${CurrentUser}`
      )
      .then((response) => {
        // Handle the response here
        showFriendRequestBtn();
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }

  function handleAcceptFriend() {
    axios
      .post(`${import.meta.env.VITE_PORT}/users/${CurrentUser}/friends`, {
        friendUserName: userNameURL,
      })
      .then((response) => {
        // Handle the response here
        setCancelFriend(true);
        setConfirmFriend();
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }

  function requestHandle() {
    if (CancelFriend) {
      handleDeleteFriend();
    } else if (ConfirmFriend) {
      handleAcceptFriend();
    } else if (AddFriend) {
      handleDeleteRequest();
    } else handeSendRequest();
  }

  if (!userData || loading) {
    return (
      <div className="w-full flex-grow flex h-[100vh] items-center justify-center">
        <ReactLoading
          type={"spin"}
          color={"#ea3cd2"}
          height={"50px"}
          width={"50px"}
        />
      </div>
    );
  }

  function ParentShowingPostHandler(data) {
    setShowingPostDetails(data);
  }

  function PostFilterHanlde(data) {
    setFilter(data);
  }

  console.log(userData);

  return (
    <>
      {showingPostDetails && (
        <>
          <PostDetails
            sendReactToParentFeeds={sendReactToParentFeeds}
            id={showingPostDetails}
            close={closingPostDetails}
          />
          <div className="bg-effect left-0 fixed top-[0em] z-max w-full h-[80px]">
            <AiOutlineClose
              onClick={() => {
                setCLosingPostDetails(true);
                setTimeout(() => {
                  setShowingPostDetails(false);
                  setCLosingPostDetails(false);
                }, 150);
              }}
              className="vertical-center cursor-pointer border text-black left-5 rounded-full p-[0.2em]"
              size={25}
            />
          </div>
        </>
      )}
      <div className="profile-grid bg-[#171717] border-t border-gray-700 mt-[7em]">
        <div className="profile-cover h-[450px] relative overflow-none rounded-lg">
          <img
            src={userData.coverURL ? userData.coverURL : defaultCoverImg}
            className="w-full h-full object-cover object-center"
            alt=""
          />
          {options && (
            <button
              onClick={OpenCoverWidget}
              className="absolute bg-white text-black font-bold py-[0.7em] px-[2em] rounded-full border top-[2em] left-[2em]"
            >
              Change Cover
            </button>
          )}
        </div>
        <div className="edit-user-info">
          {userNameURL !== CurrentUser ? (
            <button
              onClick={requestHandle}
              className={`border px-[2.5em] ${
                AddFriend && "bg-white text-black font-bold"
              } py-[0.6em] transition mt-[2.5em] ${
                CancelFriend && "bg-red-600 border-none font-bold"
              } duration-300 rounded-full hover:bg-white hover:text-black`}
            >
              {CancelFriend
                ? "Remove Friend"
                : ConfirmFriend
                ? "Confirm"
                : !AddFriend
                ? "Add friend"
                : "Friend request is sent"}
            </button>
          ) : (
            <button
              onClick={() => {
                localStorage.clear("token");
                naviagte("/login");
              }}
              className="bg-red-600 py-[0.5em] px-[2em] rounded-full mt-[2.5em] text-white"
            >
              Log out
            </button>
          )}
        </div>
        <div className="profile-info-user h-[180px] relative top-[-80px] flex flex-row-reverse">
          <div className="relative">
            <img
              src={userData.imgURL ? userData.imgURL : defaultProfilePic}
              className="min-w-[180px] main-text-gradient-background  mx-auto w-[180px] min-h-[180px] h-[180px] bg-[#171717] border-[5px] border-[#282424] object-cover object-center rounded-full"
              alt="profile-img"
            />
            {options && (
              <AiFillCamera
                onClick={openProfileWidget}
                className="absolute bottom-0 left-[2em] bg-black border rounded-full text-black p-[5px] cursor-pointer"
                size={35}
              />
            )}
          </div>

          <div className="mx-[1em] profile-name mt-[4.5em] self-center">
            <h1 className="font-black text-[1.6rem] capitalize">
              {userData.firstName} {userData.lastName}
            </h1>
            <p>{userData.friends && userData.friends.length} Friends</p>
            <p className="text-gray-500">{userData.userName}</p>
          </div>
        </div>
        <div className="profile-bar py-[1.5em] border-t border-gray-700">
          <ProfileBar filter={PostFilterHanlde} />
        </div>
      </div>

      <div className="user-data profile-data-grid pb-[2em] pt-[2em]">
        <ProfilePost
          ParentShowingPostHandler={ParentShowingPostHandler}
          options={options}
          about={userData.userDescription}
          filter={Filter}
          userNameURL={userNameURL}
          forceRenderMainFeed={forceRenderMainFeed}
          ableToCreate={GetUserName() === userNameURL}
        />
      </div>
    </>
  );
};

export default ProfilePage;
