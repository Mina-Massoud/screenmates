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

const axiosInstance = axios.create({
  withCredentials: true, // Include credentials in cross-origin requests
});
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
  const firstRender = useRef(1);
  console.log(firstRender);
  const [hasMoreState, setHasMoreState] = useState(true);
  const scrollableDiv = useRef();
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
    pageNumber.current = pageNumber.current + 1;
    console.log("Updated pageNumber:", pageNumber.current);
    // Step 2: Include the cookie in the headers of your HTTP request
    if (pageNumber.current) {
      const apiUrl = profile
        ? `${
            import.meta.env.VITE_PORT
          }/users/${userNameURL}/posts?req=${GetUserName()}&mediaType=${filter}&offset=${
            pageNumber.current
          }&limit=${10}`
        : `${import.meta.env.VITE_PORT}/feed/${userNameURL}?offset=${
            pageNumber.current
          }&limit=${10}`;

      axios
        .get(apiUrl)
        .then(function (response) {
          // handle success
          console.log(response);
          if (!response.data.length) {
            setHasMoreState(false);
            return;
          }
          setPosts((prev) => [...prev, ...response.data]);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  // useEffect(() => {
  //   fetchData(); // Fetch initial data
  // }, []);
  console.log(posts);
  useEffect(() => {
    pageNumber.current = 0;
    setPosts([]);
    fetchData();
  }, [filter, userNameURL]);

  console.log(posts);
  return (
    <div
      id={!profile && "scrollableDiv"}
      ref={scrollableDiv}
      className=" home-side  posts-section"
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
