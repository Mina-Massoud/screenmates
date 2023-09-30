import React, { useReducer, useRef } from "react";
import profileImg from "../../media/profile-img.jpg";
import FriendCard from "./friend-render";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import GetUserName from "../../APIS/getUserName";
import InfiniteScroll from "react-infinite-scroll-component";

const FriendsSide = (props) => {
  const [friends, setFriends] = useState();
  const [hasMoreState, setHasMoreState] = useState();
  const pageNumber = useRef(0);
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    pageNumber.current = pageNumber.current + 1;
    axios
      .get(
        `${import.meta.env.VITE_PORT}/users/${GetUserName()}/friends?offset=${
          pageNumber.current
        }&limit=10`
      )
      .then((response) => {
        // Handle the response here
        if (!response.data.length) {
          setHasMoreState(false);
        }
        setFriends(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }

  if (!friends) {
    return <h1 className="friends-side">Loading...</h1>;
  }

  if (friends.length === 0) {
    return <h1 className="friends-side">No Friends Exist</h1>;
  }

  return (
    <div className="friends-side bg-[#282828] overflow-handle rounded-lg p-[0.5em]">
      <h1 className="text-[2rem] font-black">Friends</h1>
      <InfiniteScroll
        dataLength={friends.length}
        next={fetchData}
        hasMore={hasMoreState}
        scrollableTarget="scrollableDiv"
        className="friends-cont flex flex-col"
      >
        {friends.map((friend) => {
          return <FriendCard data={friend} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default React.memo(FriendsSide);
