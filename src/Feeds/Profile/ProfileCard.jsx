import React, { useState } from "react";
import coverImg from "../../media/cover.jpg";
import profileImg from "../../media/profile-img.jpg";
import { Link } from "react-router-dom";
import GetUserName from "../../APIS/getUserName";
import { useEffect } from "react";
import axios from "axios";
import defaultProfilePic from "../../media/defaultProfilePic.jpg";
import defaultCoverImg from "../../media/defaultCoverImg.jpg";

const ProfileCardFeed = (props) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PORT}/users/${GetUserName()}`)
      .then(function (response) {
        // handle success
        setUserData(response.data[0]);
        console.log(response.data[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  if (!userData) {
    return <h1>Fetching...</h1>
  }

  return (
    <div className=" mb-[2em] p-[1em] bg-[#282828] rounded-lg">
      <img
        src={userData.coverURL ? userData.coverURL : defaultCoverImg}
        className="max-h-[200px] object-cover rounded-lg overflow-none"
        alt=""
      />
      <div className="info-user flex items-center justify-center">
        <div className="photo-user">
          <img
            className="object-cover object-center max-w-[100px] max-h-[100px] relative top-[-20px] rounded-lg"
            src={userData.imgURL ? userData.imgURL : defaultProfilePic}
            alt=""
          />
        </div>
      </div>
      <h3 className="text-center text-[1.1em]">
        {userData.firstName} {userData.lastName}
      </h3>
      <p className="text-center text-[0.7em] text-gray-400">
      @{userData.userName}
      </p>
      <Link
        to={`/profile/${userData.userName}`}
        className="block text-center bg-[#393939] hover:bg-white hover:text-black transition duration-300 w-full rounded-lg py-[0.7em] mt-[1em]"
      >
        My Profile
      </Link>
    </div>
  );
};

export default ProfileCardFeed;
