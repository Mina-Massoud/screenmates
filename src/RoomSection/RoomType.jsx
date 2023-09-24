import React, { useEffect, useState } from "react";
import RoomTypeCard from "./RoomTypeCard";
import YoutubeLogo from "../media/Youtube.png";
import NetflixLogo from "../media/netflix.png";
import DistneyLogo from "../media/distney.png";
import HuluLogo from "../media/hulu.png";
import PrimeLogo from "../media/Prime.png";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../APIS/SocketContext";
const RoomType = (props) => {
  let navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [PrivateRoomID, setPrivateRoomID] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  let Types = [
    { image: YoutubeLogo, name: "youtube", ready: true },
    { image: NetflixLogo, name: "Netflix" },
    { image: DistneyLogo, name: "Disney+" },
    { image: HuluLogo, name: "hulu" },
    { image: PrimeLogo, name: "Prime" },
    { image: "", name: "" },
    { image: "", name: "" },
    { image: "", name: "" },
    { image: "", name: "" },
  ];

  function handleConnectingToRoom() {
    if (PrivateRoomID !== "") {
      navigate(`/room-player?private=true&roomId=${PrivateRoomID}`);
      socket.emit("join_room", PrivateRoomID);
    } else {
      setShowAlert(true);
    }
  }
  return (
    <>
      <section className="pt-[12em] pb-[12em] sm:px-[2em] lg:pt-[18em] lg:pb-[18em] room-type-bg rooms-flow-grid">
        <h1 className="text-center animate__animated animate__zoomIn text-[3rem] room-type-title font-black">
          Discover our{" "}
          <span className="main-text-gradient-color">Rooms Services</span>
        </h1>
        <p className="text-center text-[1.2rem] text-gray-300 room-type-note">
          now we only support those types of rooms,{" "}
          <span className="font-black">Stay tuned!</span>
        </p>
      </section>
      <section className="rooms-flow-grid bg-background py-[2em]">
        <h2 className="second-title-room-type text-[1.5rem] font-black">
          Choosing Streaming Service
          <p className="text-sm font-normal">
            Note:We're supporting only{" "}
            <span className="font-black">Youtube</span> until now
          </p>
        </h2>
        <div className="room-type-cont">
          {Types.map((type) => {
            return (
              <RoomTypeCard
                key={type.name}
                ready={type.ready}
                image={type.image}
                name={type.name}
              />
            );
          })}
        </div>
      </section>
      <section className="rooms-flow-grid">
        <h2 className="private-room-child text-[1.5rem] font-black">
          Or you can join Private Room from Here{" "}
        </h2>
        <div className="private-room-section py-[1.2em] px-[2em] rounded-lg mb-[2em] private-room-child sm:w-fit bg-[#ffffff14]">
          <input
            onChange={(e) => {
              setPrivateRoomID(e.target.value);
            }}
            type="text"
            placeholder="Enter Room ID"
            className="col-start-2 border mb-[1em] bg-transparent border-[#ea3cd29e] py-[0.8em] w-full max-w-[250px] text-gray-300 font-bold px-[1em] bg-[#ffffff29] rounded-lg w"
          />
          {showAlert && (
            <p className="mb-[1em] text-red-800">Please Enter Room ID</p>
          )}

          <button
            onClick={handleConnectingToRoom}
            className={`block mt-[1em] px-[2.5em] py-[0.5em] border hover:bg-white hover:text-black border-[#ea3cd29e] rounded text-white text-black transition duration-300`}
          >
            Join Room
          </button>
        </div>
      </section>
    </>
  );
};

export default RoomType;
