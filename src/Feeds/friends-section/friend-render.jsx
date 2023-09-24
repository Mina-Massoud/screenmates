import React from "react";
import profileImg from "../../media/profile-img.jpg";
import { Link } from "react-router-dom";
import defaultProfilePic from "../../media/defaultProfilePic.jpg";
const FriendCard = ({ data }) => {
  return (
    <Link className="w-full" to={`/profile/${data.userName}`}>
      <div className="p-[0.4em] mx-auto bg-[#08000e] hover:bg-[#00010e57] transition duration-300 my-[0.3em] items-center justify-between flex rounded-lg">
        <div className="left-side-friend-card flex">
          <img
            className="max-w-[70px] aspect-square object-cover rounded-lg"
            src={data.imgURL ? data.imgURL : defaultProfilePic}
            alt="friend-img"
          />
          <div className="info-friend m-[1em] flex flex-col">
            <p className="font-black">{data.firstName} {data.lastName}</p>
            <p className="text-gray-500">{data.userName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FriendCard;
