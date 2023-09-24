import React from "react";
import img from "../../../../media/profile-img.jpg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import formatTimeAgo from "../../../../helperalgo/datesAlgo";
import defaultProfilePic from "../../../../media/defaultProfilePic.jpg";
import "animate.css";
const Comment = ({ data }) => {
  if (!data) {
    return;
  }

  console.log("comments ", data);

  return (
    <div className="comment my-[2em] animate__animated animate__zoomIn items-center bg-[#282828] p-[1.2em] rounded-lg justify-between flex mx-[0.5em]">
      <p>{formatTimeAgo(data.publishDate)}</p>
      <div className=" items-center flex">
        <div className="mx-[1em]">
          <h1 className="text-right font-black my-[0.2em]">
            {data.commentPublisherData[0].firstName}{" "}
            {data.commentPublisherData[0].lastName}
          </h1>
          <p>{data.caption}</p>
        </div>
        <img
          src={
            data.commentPublisherData[0].imgURL
              ? data.commentPublisherData[0].imgURL
              : defaultProfilePic
          }
          className="w-[50px] ml-[2em] h-[50px] rounded-full object-cover ml-auto border"
          alt=""
        />
      </div>
    </div>
  );
};

export default React.memo(Comment);
