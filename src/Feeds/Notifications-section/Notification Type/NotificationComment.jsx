import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
const NotficationsComment = ({ causativeUser , postId}) => {
  const [postCaption, setPostCaption] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/posts/${postId}`) // Pass an object with key-value pairs
      .then(function (response) {
        // handle success
        console.log(response);
        setPostCaption(response.data[0].caption);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="info-friend gap-[20px] flex flex-col">
      <strong className="tracking-wide">
        {" "}
        {causativeUser} has commented on your post 👀 : <span className="text-gray-400">{postCaption}</span> 
      </strong>
    </div>
  );
};

export default NotficationsComment;
