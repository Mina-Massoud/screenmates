import React from "react";
import image from "../media/profile-img.jpg";
import defaultImg from "../media/defaultProfilePic.jpg";
import { Link } from "react-router-dom";
const SearchResultRender = ({ data }) => {
  return (
    <Link
      to={`/profile/${data.userName}`}
      className="flex items-center z-max w-full mb-[0.2em] bg-[#00000061] px-[1em] py-[0.5em] rounded-lg"
    >
      <img
        src={data.imgURL ? data.imgURL : defaultImg}
        className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
        alt=""
      />
      <h1 className="text-[1.5rem] mx-[1em]">{data.userName}</h1>
    </Link>
  );
};

export default SearchResultRender;
