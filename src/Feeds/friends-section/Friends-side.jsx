import React from "react";
import profileImg from "../../media/profile-img.jpg"
import FriendCard from "./friend-render";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
import GetUserName from "../../APIS/getUserName";
const FriendsSide = (props) => {
  const [friends, setFriends] = useState();
  useEffect(() => {
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
  }, []);

  if (!friends) { 
    return <h1 className="friends-side">Loading...</h1>
  }

  if (friends.length === 0) { 
    return <h1 className="friends-side">No Friends Exist</h1>
  }

  return (
    <div className="friends-side bg-[#282828] overflow-handle rounded-lg p-[0.5em]">
      <h1 className="text-[2rem] font-black">Friends</h1>
      <div className="friends-cont flex flex-col">
        {friends.map((friend)=>{
          return (
            <FriendCard data={friend} />
          )
        })}
      </div>
    </div>
  );
};

export default React.memo(FriendsSide);
