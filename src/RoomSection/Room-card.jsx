import React from "react";
import testImg from "../media/test-back-img.jpg";
import test2 from "../media/test2.jpg";
import test3 from "../media/test3.jpg";
import test4 from "../media/test4.jpg";
import test5 from "../media/test5.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../APIS/SocketContext";
const RoomCard = ({ data }) => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  let imges = [testImg, test2, test3, test4, test5];
  let randomIndex = Math.floor(Math.random() * imges.length);

  function handleConnectingToRoom() {
    socket.emit("join_room", data.roomID);
    navigate(`/room-player?private=true&roomId=${data.roomID}`);
  }

  return (
    <button
      onClick={handleConnectingToRoom}
      to={`room-player?private=true&roomId=${data.roomID}`}
      className="px-[0.5em] pb-[1em] bg-[#16151a] rounded-lg"
    >
      <img
        className="h-[200px] object-center object-cover rounded-lg mb-[1em]"
        src={
          data.videoData.videoData.ThumbnailURL
            ? data.videoData.videoData.ThumbnailURL
            : imges[randomIndex]
        }
        alt=""
      />
      <div className="title-of-room p-[0.5em]">
        <p>
          Watching :{" "}
          {data.videoData.videoData.Title ? data.videoData.videoData.Title : "Not watching yet"}
        </p>
      </div>
      <div className="host py-[1em] p-[0.5em]">
        <p className="inline-block text-sm">Host:</p>{" "}
        <p className="inline-block text-gray-400 text-sm">{data.videoData.owner}</p>
      </div>
      <button
        onClick={handleConnectingToRoom}
        className="w-full text-center bg-black py-[0.5em] px-[1em] rounded-lg transition duration-300 hover:bg-white hover:text-black"
      >
        Join Room
      </button>
    </button>
  );
};

export default RoomCard;
