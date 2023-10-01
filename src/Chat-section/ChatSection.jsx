import React, { useState } from "react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
const { Element, scroller } = Scroll;
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../APIS/SocketContext";
const ChatSection = (props) => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [roomId , setRoomId] = useState(""); 

  function handleRoomConnect(data) {
    if (data)
    navigate(`/chat/chat-connected?private=true&roomId=${data.roomID}`);
  }

  if (!socket.connected) {
    socket.connect();
  }
  
  async function handleConnectingToRoomInput() {
    if (roomId !== "") {
      await socket.emit("join_room", roomId);
      navigate(`/chat/chat-connected?private=true&roomId=${roomId}`);
    }
  }

  async function handleRoomPrivteCreate() {
    await socket.emit("create_room");
    await socket.on("room_created", handleRoomConnect);
  }

  return (
    <>
      <section className="main-grid py-[12em] chat-bg">
        <div className="home-title flex flex-col">
          <div className="home-main-title">
            <h1 className="text-[2rem] animate__animated animate__zoomIn sm:text-[3rem] font-black">
              Chat with people from all over the world on ,{" "}
              <span className="main-text-gradient-color main-title-span">
                Screenmates
              </span>
            </h1>
          </div>
          <p className="transparent-color my-[2em] mb-[5em]">
            Make friends while watching! Host or join virtual watch parties,
            connect with like-minded individuals, and enjoy the shared
            experience of watching your favorite shows, movies, or sports.
          </p>
          <div className="buttons flex mt-auto">
            <button
              className="main-text-gradient-background text-center py-[0.8em] px-[7%] mr-[1em] rounded-full font-black"
              onClick={() =>
                scroller.scrollTo("random-chat", {
                  duration: 800,
                  delay: 100,
                  smooth: true,
                  offset: -50, // Optional offset, adjust as needed
                })
              }
            >
              Explore
            </button>
          </div>
        </div>
      </section>
      <Element className="random-chat">
        <section className="main-grid pt-[7em] pb-[4em] gap-grid">
          <div className="home-title flex flex-col">
            <div className="home-main-title">
              <h1 className="text-[2rem] animate__animated animate__zoomIn sm:text-[3rem] font-black">
                Enter our Next-Level{" "}
                <span className="main-text-gradient-color main-title-span">
                  Random Chat
                </span>{" "}
                Universe!
              </h1>
            </div>
            <p className="transparent-color my-[2em] mb-[5em]">
              Welcome to Random Chat! Engage in spontaneous conversations, share
              thoughts, and make new friends. From pop culture to deep
              discussions, this is your space to connect. Embrace curiosity,
              respect others, and let the magic of spontaneity unfold!
            </p>
            <div className="buttons flex">
              <Link
                to="chat-connected"
                className="border py-[1em] px-[7%] rounded-full font-black transition duration-300 hover:bg-white hover:text-black"
              >
                Join Random Room
              </Link>
            </div>
          </div>
          <div className="second-home-title flex flex-col justify-between">
            <div className="home-main-title">
              <h1 className="text-[2rem] animate__animated animate__zoomIn sm:text-[3rem] font-black">
                Connect and Communicate{" "}
                <span className="main-text-gradient-color main-title-span">
                  Privately
                </span>{" "}
              </h1>
            </div>
            <div className="info-chat-about">
              <p className="transparent-color my-[2em] mb-[5em]">
                Step into the Realm of Connections! Discover a world where
                private conversations flourish, friendships bloom, and
                inspiration sparks. Welcome to our enchanted space, where the
                magic of personal interaction awaits.
              </p>
              <div className="options">
                <div className="buttons flex flex-col items-center sm:items-start">
                  <input
                    type="text"
                    placeholder="Enter Room ID"
                    onChange={(event)=>{setRoomId(event.target.value)}}
                    className="py-[1em] text-[1.1rem] px-[2em] bg-transparent border rounded-full my-[1em]"
                  />
                  <div className="options-button flex justify-between">
                    <button
                      onClick={handleConnectingToRoomInput}
                      to="random-rooms"
                      className="border py-[1em] px-[2em] rounded-full font-black transition duration-300 hover:bg-white hover:text-black"
                    >
                      Connect
                    </button>
                    <button
                      onClick={handleRoomPrivteCreate}
                      className="border py-[1em] text-[0.8rem] md:text-[1rem] px-[1em] mx-[1em] rounded-full font-black transition duration-300 hover:bg-white hover:text-black"
                    >
                      Create Private Room
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Element>
    </>
  );
};

export default ChatSection;
