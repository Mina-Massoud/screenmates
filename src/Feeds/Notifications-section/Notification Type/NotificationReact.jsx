import React from "react";
import TopReactsRender from "../../main-feed-content/Posts-section/Reacts/TopReacts";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const NotificationReact = ({ causativeUser, reactType, postId }) => {
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
    <div className="info-friend gap-[5px] flex flex-col">
      <strong className="tracking-wide">
        {" "}
        {causativeUser} has reacted on your post:{" "}
        <p className="text-gray-400 max-w-[200px] block text-overflow overflow-hidden">
          {postCaption}
        </p>
      </strong>
      <TopReactsRender reactType={reactType} />
    </div>
  );
};

export default NotificationReact;
