import React, { useState } from "react";
import { Link } from "react-router-dom";
const ProfileBar = ({ filter }) => {

  const [selected , setSelected] = useState(1);
  return (
    <div className="flex justify-start items-center font-bold flex-row-reverse">
      <button
        onClick={(event) => {
          filter("");
          setSelected(1)
        }}
        className={
          selected === 1
            ? "bg-white text-black bar-item mx-[1em] hover:bg-white hover:text-black transition rounded-lg px-[1.5em] py-[0.7em] duration-300 text-[1.1rem]"
            : "mx-[1em] hover:bg-white bar-item hover:text-black transition rounded-lg px-[1.5em] py-[0.7em] duration-300 text-[1.1rem]"
        }
      >
        All
      </button>
      <button
        onClick={(event) => {
          filter("image");
          setSelected(2)
        }}
        className={
          selected === 2
            ? "bg-white text-black bar-item mx-[1em] hover:bg-white hover:text-black transition rounded-lg px-[1.5em] py-[0.7em] duration-300 text-[1.1rem]"
            : "mx-[1em] hover:bg-white bar-item hover:text-black transition rounded-lg px-[1.5em] py-[0.7em] duration-300 text-[1.1rem]"
        }
      >
        Images
      </button>
      <button
        onClick={(event) => {
          filter("video");
          setSelected(3)
        }}
        className={
          selected === 3 
            ? "bg-white text-black bar-item mx-[1em] hover:bg-white hover:text-black transition rounded-lg px-[1.5em] py-[0.7em] duration-300 text-[1.1rem]"
            : "mx-[1em] hover:bg-white bar-item hover:text-black transition rounded-lg px-[1.5em] py-[0.7em] duration-300 text-[1.1rem]"
        }
      >
        Videos
      </button>
    </div>
  );
};

export default ProfileBar;
