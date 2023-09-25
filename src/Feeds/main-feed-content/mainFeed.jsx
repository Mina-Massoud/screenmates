import React, { useEffect, useState } from "react";
import CreatePost from "./Posts-section/CreatePost";
import Post from "./Posts-section/Post";
import { FaUserFriends } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { BsFillPersonFill, BsTypeH1 } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import axios from "axios";
import "animate.css";
import { Link } from "react-router-dom";
import GetUserName from "../../APIS/getUserName";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRef } from "react";
const Mainfeed = ({
  profile = false,
  ParentShowingPostHandler,
  filter,
  userNameURL = GetUserName(),
  forceRender,
  ableToCreate = true,
}) => {
  const [posts, setPosts] = useState([]);
  const pageNumber = useRef(0);
  const [hasMoreState, setHasMoreState] = useState(true);
  const test = useRef();
  function sendPostToParentHandle(data) {
    if (posts.length > 0) {
      setPosts((prevPosts) => [data, ...prevPosts]);
    } else {
      setPosts([data]);
    }
  }

  function ShowingPostDetailsHandler(data) {
    ParentShowingPostHandler(data);
  }

  const fetchData = () => {
    console.log("enterdsss");
    // Get posts based on the profile and filter values
    // Example usage of pageNumber
    pageNumber.current = pageNumber.current + 1;
    console.log("Updated pageNumber:", pageNumber.current);

    console.log(pageNumber);
    const apiUrl = profile
      ? `https://screenmates-beta-v.onrender.com/users/${userNameURL}/posts?req=${GetUserName()}&mediaType=${filter}&offset=${
          pageNumber.current
        }&limit=${10}`
      : `https://screenmates-beta-v.onrender.com/feed/${userNameURL}?offset=${pageNumber}&limit=${10}`;

    axios
      .get(apiUrl)
      .then(function (response) {
        // handle success
        console.log(response);
        if (!response.data.length) {
          console.log(response.data.length);
          setHasMoreState(false);
          return;
        }
        setPosts((prev) => [...prev, ...response.data]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, [forceRender, filter, userNameURL, profile]);

  // useEffect(() => {
  //   //get posts
  //   if (!profile) {
  //     axios
  //       .get(`http://localhost:8000/feed/${userNameURL}`) // Pass an object with key-value pairs
  //       .then(function (response) {
  //         // handle success
  //         setPosts(response.data);
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         console.log(error);
  //       });
  //   }
  // }, [forceRender]);

  // useEffect(() => {
  //   if (profile) {
  //     axios
  //       .get(
  //         `http://localhost:8000/users/${userNameURL}/posts?req=${GetUserName()}&mediaType=${filter}`
  //       ) // Pass an object with key-value pairs
  //       .then(function (response) {
  //         // handle success
  //         console.log("entered");
  //         console.log(response);
  //         setPosts(response.data);
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         console.log(error);
  //       });
  //   }
  // }, [filter, userNameURL, forceRender]);

  return (
    <div
      id={!profile && "scrollableDiv"}
      ref={test}
      className="overflow-handle home-side  posts-section"
    >
      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMoreState}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p className="text-center py-[2em]">
            <b>Yay! You have seen it all</b>
          </p>
        }
        loader={<h4>Loading...</h4>}
        className="pb-[0.5em] flex flex-col animate__animated animate__zoomIn"
      >
        {!profile && (
          <div className="feeds-bar hidden pt-[0.3em] pb-[2em] justify-between-sm ml-auto flex">
            <Link to="friends">
              <FaUserFriends className="bg-[#ffffff24] hidden friends-icon w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] hover:bg-[#535353]  p-[0.5em] sm:p-[1em] mx-[1em] rounded-full transition duration-300 cursor-pointer" />
            </Link>
            <Link to="notification">
              <IoMdNotifications className="bg-[#ffffff24] hidden notification-icon  w-[35px] h-[35px] sm:w-[50px] sm:h-[50px]  hover:bg-[#535353] p-[0.5em]  sm:p-[1em] mx-[1em]  rounded-full transition duration-300 cursor-pointer" />
            </Link>
            <Link to={`/profile/${GetUserName()}`}>
              <BsFillPersonFill className="bg-[#ffffff24] hidden profile-icon w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] p-[0.5em] sm:p-[1em] hover:bg-[#535353] mx-[1em] rounded-full transition duration-300 cursor-pointer" />
            </Link>
            <Link>
              <AiFillMessage className="bg-[#ffffff24] hidden chat-icon  w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] hover:bg-[#535353] p-[0.5em] sm:p-[1em] mx-[1em]  rounded-full transition duration-300 cursor-pointer" />
            </Link>
          </div>
        )}

        {ableToCreate && (
          <CreatePost sendPostToParentHandle={sendPostToParentHandle} />
        )}

        <div className="flex flex-col gap-[2em]">
          {posts && posts.length > 0
            ? posts.map((child) => {
                return (
                  <Post
                    key={child._id}
                    data={child}
                    showingPostHandler={ShowingPostDetailsHandler}
                  />
                );
              })
            : ""}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Mainfeed;
