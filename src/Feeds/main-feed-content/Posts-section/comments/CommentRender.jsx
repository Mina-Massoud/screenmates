import React from "react";
import img from "../../../../media/profile-img.jpg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import formatTimeAgo from "../../../../helperalgo/datesAlgo";
import defaultProfilePic from "../../../../media/defaultProfilePic.jpg";
import "animate.css";
import GetUserName from "../../../../APIS/getUserName";
import { IoIosArrowDropdown } from "react-icons/io";
import DropDownPostsList from "../DropDownList/DropDownList";
import EditComment from "./Edit comment/EditComment";
const Comment = ({ data  , postId}) => {
  console.log(data);
  console.log(postId);
  const [showListButton, setShowListButton] = useState(
    data.commentPublisherData.userName === GetUserName()
  );

  const [showDropDownList, setshowDropDownList] = useState(false);
  const [isEditedEffect, setIsEditedEffect] = useState(false);
  const [isDeletedEffect, setIsDeletedEffect] = useState(false);

  function isEdit(param) {
    console.log("in");
    setshowDropDownList(false);
    setIsEditedEffect(true);
  }

  console.log(isEditedEffect);

  function isDeleted(param) {
    setIsDeletedEffect(param);
  }

  function onCancel(param) {
    setIsEditedEffect(false);
    if (param) {
      data.caption = param;
    }
  }

  if (!data) {
    return;
  }

  if (isDeletedEffect) {
    return;
  }

  return (
    <div
      className={`comment pt-[30px] pb-[20px] relative ${
        showDropDownList ? "mb-[4em]" : "my-[2em]"
      } flex-col-reverse md:flex-row animate__animated animate__zoomIn md:items-center bg-[#282828] px-[1em] rounded-lg justify-between flex mx-[0.5em]`}
    >
      {showListButton && (
        <IoIosArrowDropdown
          size={25}
          className="cursor-pointer absolute top-[0.5em] left-[0.5em] text-gray-300 z-max"
          onClick={() => {
            setshowDropDownList((prev) => !prev);
          }}
        />
      )}
      {showDropDownList && (
        <DropDownPostsList
          isEdit={isEdit}
          comment={true}
          isDeleted={isDeleted}
          id={data._id}
          postId={postId}
        />
      )}
      <p>{formatTimeAgo(data.publishDate)}</p>
      <div className=" items-center justify-end ml-auto w-[full] md:w-[70%] flex">
        <div className="mx-[1em] w-full">
          <h1 className="text-right font-black my-[0.2em]">
            {data.commentPublisherData.firstName}{" "}
            {data.commentPublisherData.lastName}
          </h1>
          {isEditedEffect ? (
            <EditComment
              initialValue={data.caption}
              id={data._id}
              postId={postId}
              onCancel={onCancel}
            />
          ) : (
            <p className="w-fit ml-auto">{data.caption}</p>
          )}
        </div>
        <img
          src={
            data.commentPublisherData.imgURL
              ? data.commentPublisherData.imgURL
              : defaultProfilePic
          }
          className="min-w-[50px] w-[50px] max-w-[50px] h-[50px] rounded-full object-cover  border"
          alt=""
        />
      </div>
    </div>
  );
};

export default React.memo(Comment);
