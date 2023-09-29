import React, { useEffect, useState } from "react";
import FriendCard from "./friend-render";
import axios from "axios";
import GetUserName from "../../APIS/getUserName";
import InfiniteScroll from "react-infinite-scroll-component";

const FriendPage = (props) => {
  const [friends, setFriends] = useState();
  const [hasMoreState, setHasMoreState] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PORT}/users/${GetUserName()}/friends`)
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
  }, []);

  function fetchData() {
    axios
      .get(`${import.meta.env.VITE_PORT}/users/${GetUserName()}/friends`)
      .then((response) => {
        // Handle the response here
        setFriends(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }

  if (!friends) {
    return <h1>Loading...</h1>;
  }

  if (friends.length === 0) {
    return <h1>No Friends Exist</h1>;
  }

  return (
    <div className="flex-grow flex mx-[1em] flex-col pt-[6em]">
      <h1 className="text-[3rem] mx-[5px] my-[5px] font-black">Friends</h1>
      <InfiniteScroll
        dataLength={friends.length}
        next={fetchData}
        hasMore={hasMoreState}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p className="text-center py-[2em]">
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="w-full px-[1em] bg-[#111111] overflow-handle mx-auto rounded-lg flex flex-col items-center py-[1em]"
      >
        {friends.map((friend) => {
          return <FriendCard data={friend} parent={true} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default FriendPage;
