import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import GetUserName from "../../../APIS/getUserName";
const About = ({ aboutData, options }) => {
  const [editEffect, setEditEffect] = useState(false);
  const [about, setAbout] = useState(aboutData);
  const [aboutTemp, setAboutTemp] = useState(aboutData);
  console.log(options);
  const AboutInput = useRef();

  function openAboutEdit() {
    setEditEffect(true);
  }
  function handleConfirmEdit() {
    axios
      .put(`https://screenmates-beta-v.onrender.com/${GetUserName()}`, {
        userDescription: AboutInput.current.value,
      })
      .then((response) => {
        // Handle the response here
        console.log(response);
        setAbout(AboutInput.current.value);
        setEditEffect(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }

  return (
    <div className="about ml-[1em]">
      <div className="bg-[#282828] pb-[2em] h-fit  rounded-lg p-[1em]">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-[1.5rem]">About</h2>
          {options && (
            <FiEdit2
              onClick={openAboutEdit}
              className="transition duration cursor-pointer hover:scale-[1.5]"
            />
          )}
        </div>
        {editEffect && (
          <div className="pt-[1em]">
            <input
              ref={AboutInput}
              className="py-[0.5em] rounded-lg px-[1em] w-full"
              type="text"
              name=""
              id=""
              value={aboutTemp}
              onChange={(e) => setAboutTemp(e.target.value)}
            />

            <div className="flex mt-[1em] gap-[15px]">
              <button
                onClick={handleConfirmEdit}
                className="bg-[#181818] transition duration hover:bg-[#101010] px-[1em] py-[0.5em] rounded-lg"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setEditEffect(false);
                }}
                className="bg-[#181818] transition duration hover:bg-[#101010] px-[1em] py-[0.5em] rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {!editEffect && (
          <p className="mt-[1em] text-gray-300 text-[1.2rem] font-black">{about} </p>
        )}
      </div>
      <p className="bg-[#a1a1a138] h-[4px] mt-[2em] w-full"></p>
    </div>
  );
};

export default About;
