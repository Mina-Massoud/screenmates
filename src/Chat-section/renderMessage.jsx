import React from "react";
import GetUserName from "../APIS/getUserName";

const RenderMessage = ({ message, anonymously, socket }) => {
  const messageText = message.message;
  let userName = GetUserName();
  console.log("message ", message);
  // if (anonymously) {
  //   message.author = socket;
  //   userName = socket;
  // } else {
  //   message.author = GetUserName();
  //   userName = GetUserName();
  // }

  return (
    <div className="animate__animated max-w-full mr-[1em] my-[1.5em] animate__zoomInUp">
      <p
        className={`${
          userName === message.author ? "ml-auto mr-[1em]" : "mr-auto ml-[1em]"
        } w-fit`}
      >
        {message.author}
      </p>
      <div
        className={`py-[0.5em] break-word px-[1em] rounded-lg max-w-full my-[0.5em] ${
          userName === message.author
            ? "ml-auto mr-[1em] bg-[#d250d3]"
            : "mr-auto ml-[1em]  border border-[#5ab6d7] bg-none"
        } w-fit text-wrap`}
      >
        <p>{messageText}</p>
      </div>
      <p
        className={`${
          userName === message.author
            ? "ml-auto mr-[1.5em]"
            : "mr-auto ml-[1.5em]"
        } w-fit text-xs`}
      >
        {message.time}
      </p>
    </div>
  );
};

export default RenderMessage;
