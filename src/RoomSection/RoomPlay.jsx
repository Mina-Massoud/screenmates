import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import Chat from "../Chat-section/Chat";
import { useContext } from "react";
import { SocketContext } from "../APIS/SocketContext";
import { useSearchParams } from "react-router-dom";
// import copy from "clipboard-copy";
import "animate.css";
import GetUserName from "../APIS/getUserName";

const RoomPlay = (props) => {
  // State for rendering
  let [SearchData, setSearchData] = useState();
  const [SrcVideo, setSrcVideo] = useState("");
  const socket = useContext(SocketContext);
  let [canIEmit, setCanIemit] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [roomId, setRoomId] = useState(searchParams.get("roomId"));
  const isPrivate = searchParams.get("private");
  const playerRef = useRef();
  const [isReady, setIsReady] = useState(false);
  const [isVideoStarted, setIsVideoStarted] = useState(false);
  const [currenttime, setCurrentTime] = useState(false);
  const [userJoined, setUserIsJoined] = useState(false);
  const [isOwner, setIsOwner] = useState(
    localStorage.getItem("owner") === GetUserName()
  );
  const [pausedFromOnwer, setPausedFromOnwer] = useState(false);
  const [videoTime, setVideoTime] = useState();
  // Function to copy the parameter to the clipboard
  const copyToClipboard = (roomID) => {
    copy(roomID);
    alert(`Copied: ${roomID}`);
  };

  // Function to handle changes in room ID
  function handleRoomID(data) {
    setRoomId(data);
  }

  useEffect(() => {
    // Join random room if not private
    if (!isPrivate) {
      socket.emit("join_random_room");
      socket.on("joined_random_room", handleRoomID);
    }

    // Handle video ready event
    socket.on("video_ready_to", (URLData) => {
      HandleSearch(URLData);
      setSearchData(URLData);
    });

    socket.on("userJoined", (data) => {
      setUserIsJoined(true);
      setIsOwner(data.owner === GetUserName());
      handleSharedDetails(data.socketId);
    });

    // Handle video started event
    socket.on("video_started_to", (Time) => {
      setIsVideoStarted(true);
      setCurrentTime(Time);
      setCanIemit(false);
      handleSeekTo(Time);
    });

    socket.on("setVideoTime", ({ videoTime }) => {
      console.log(videoTime);
      setVideoTime(videoTime);
      handleSeekTo(videoTime);
    });

    // Handle video paused event
    socket.on("video_paused_to", () => {
      setPausedFromOnwer(true);
      playerRef.current.pauseVideo();
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      socket.off("joined_random_room", handleRoomID);
      socket.off("video_started_to");
      socket.off("video_paused_to");
      socket.off("video_ready_to");
      socket.off("userJoined");
    };
  }, [SearchData]);

  console.log(videoTime);

  useEffect(() => {
    if (isReady) {
      if (isVideoStarted) {
        setCanIemit(false);
        handleSeekTo(currenttime);
      }
    }
  }, [isReady]);

  // Function to seek to a specific time in the video
  const handleSeekTo = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds);
      playerRef.current.playVideo();
      // console.log("video played " + canIEmit);
    }
  };

  // Function to handle video paused
  function handleOnPause() {
    if (!isOwner) {
      playerRef.current.playVideo();
      return 0;
    }
    socket.emit("video_paused", roomId);
  }

  // Function to handle video play
  function handleOnPlay(event) {
    setIsVideoStarted(true);
    if (canIEmit) {
      if (!videoTime) {
        socket.emit("video_started", {
          roomId,
          currentTime: event.target.getCurrentTime(),
        });
      }
    } else {
      setCanIemit(true);
    }
  }

  // Function to handle video ready
  function handleOnReady() {
    // console.log(roomId, SearchData);
    socket.emit("video_ready", {
      roomId,
      video_URL: SearchData,
    });
  }

  useEffect(() => {
    if (isVideoStarted) {
      console.log("userJoined");
      socket.emit("video_started", {
        roomId,
        currentTime: playerRef.current.getCurrentTime(),
      });
    }
  }, [userJoined]);

  // function to share current video status
  function handleSharedDetails(userID) {
    if (playerRef.current) {
      socket.emit("shareVideoDetails", {
        currentTime: playerRef.current.getCurrentTime(),
        userID: userID,
        videoURL: SearchData,
      });
      // if (isVideoStarted) {
      //   socket.emit("video_started", {
      //     roomId,
      //     currentTime: playerRef.current.getCurrentTime(),
      //   });
      // }

      // setTimeout(() => {

      // }, 1000);
    }
  }

  // Function to get YouTube video ID from a URL
  function getYouTubeVideoId(link) {
    console.log(link);
    const url = new URL(link);
    const searchParams = new URLSearchParams(url.search);
    return searchParams.get("v");
  }

  // Function to handle video search
  function HandleSearch(Data) {
    setSrcVideo(String(getYouTubeVideoId(Data)));
  }

  const videoOpts = {
    playerVars: {
      controls: 0, // Disable player controls
      disablekb: 1, // Disable keyboard control (pause/play)
    },
  };

  return (
    <div className="animate__animated animate__zoomIn mt-[1.5em]">
      <div className="flex w-full px-[2em] mt-[6em] items-center">
        <input
          type="text"
          onChange={(event) => {
            setSearchData(event.target.value);
          }}
          placeholder="Please Enter the URL of the Youtube Video"
          className="p-[1em] text-gray-300 search-input my-[2em] font-bold px-[1em] bg-[#ffffff29] rounded-lg w-full"
        />
        <button
          onClick={() => HandleSearch(SearchData)}
          className="border border-[#4ab6cd] mx-[0.5em] p-[1em] rounded-lg"
        >
          Search
        </button>
        {/* <button
          onClick={() => {
            copyToClipboard(roomId);
          }}
          className="p-[1em] min-w-[100px] border border-[#ea3cd2] rounded-lg"
        >
          Room ID
        </button> */}
      </div>
      <div className="flex-grow bg-background pb-[2em] room-player-grid">
        <div className="room-player-video relative flex items-center justify-center">
          {SrcVideo ? (
            <>
              <YouTube
                className="w-full h-full"
                videoId={SrcVideo}
                iframeClassName={"w-full h-full"}
                onPause={(event) => {
                  if (!pausedFromOnwer) {
                    handleOnPause();
                  }
                  setPausedFromOnwer(false);
                  event.preventDefault();
                }}
                // opts={!isOwner && videoOpts}
                onPlay={handleOnPlay}
                onReady={(event) => {
                  // Access the player instance via event.target
                  playerRef.current = event.target;
                  handleOnReady();
                  setIsReady(true);
                }}
              />

              {/* <button
                onClick={handleBackToLive}
                disabled
                className={`absolute ${
                  isLive ? "bg-red-700" : "bg-gray-700"
                }  text-white font-black px-[2em] py-[0.5em] text-[15px] top-[1em] right-[1em]`}
              >
                Live
              </button> */}
            </>
          ) : (
            <h1 className="text-[2rem] text-center font-black main-text-gradient-color">
              Your Video Should Shows Here
            </h1>
          )}
        </div>
        <Chat grid={"room-chat-video-mini"} />
      </div>{" "}
    </div>
  );
};

export default RoomPlay;
