import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../APIS/SocketContext";
const RoomTypeCard = ({ image, name, ready }) => {
  let navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [clickable, setClickable] = useState(true);
  const createRoomBtn = useRef(null);

  function handleRoomConnect(data) {
    navigate(`/room-player?private=true&roomId=${data}`);
  }

  async function handleRoomPrivteCreate() {
    setClickable(false);
    socket.emit("create_room");
    socket.on("room_created", handleRoomConnect);
  }

  console.log(ready);

  return (
    <>
      {image || name ? (
        <button
          ref={createRoomBtn}
          onClick={() => {
            clickable && handleRoomPrivteCreate();
          }}
          disabled={!ready && true}
          className={`room-type ${
            !ready ? "cursor-not-allowed bg-[#888888]" : "transform-effect bg-[#ffffff14]"
          } p-[2em] flex items-center justify-center transition duration-300 ${
            !clickable && "cursor-not-allowed"
          }  rounded-lg `}
        >
          {image ? (
            <img className="w-[200px]" src={image} alt="" />
          ) : name ? (
            <h1 className={`text-[2rem] text-center font-black`}>{name}</h1>
          ) : (
            ""
          )}
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default RoomTypeCard;
