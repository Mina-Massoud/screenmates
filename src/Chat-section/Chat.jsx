import React, { useRef, useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { BiSend } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import RenderMessage from "./renderMessage";
import { useContext } from "react";
import { SocketContext } from "../APIS/SocketContext";
import ReactLoading from "react-loading";
import GetUserName from "../APIS/getUserName";
const Chat = ({ grid }) => {
  let [messages, setMessages] = useState([]);
  let messageInput = useRef(null);
  const socket = useContext(SocketContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchParams, setSearchParams] = useSearchParams();
  const isPrivate = searchParams.get("private");
  const [roomId, setRoomId] = useState(searchParams.get("roomId"));
  const [render, setRender] = useState(grid);
  const [userInter, setUserInter] = useState(false);
  const [anonymously, setAnonymously] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 650);
  }, []);

  const handleMessageReceived = (data) => {
    console.log(`message data ${data}`);
    setMessages((prev) => [...prev, data]);
  };
  function handleRoomID(data) {
    setRoomId(data);
    // setUserInter(data.socketId);
  }

  async function handleJoinRandomRoom() {
    socket.emit("join_random_room");
    await socket.on("joined_random_room", handleRoomID);
  }

  useEffect(() => {
    if (!isPrivate) {
      handleJoinRandomRoom();
    } else {
      socket.on("room_created", handleRoomID);
      // setIsConnected(true);
    }
    // socket.on("userJoined", (data) => {
    //   console.log(data);
    //   if (data.connectedUser !== GetUserName()) {
    //     const userJoinedData = {
    //       connectedUser: data.connectedUser,
    //       message: `${data.connectedUser} Joined the room!`,
    //       messageType: "alert",
    //     };
    //     setMessages((prev) => [...prev, userJoinedData]);
    //   }
    // });
    // socket.on("userIsConnected", connectedUser);
    socket.on("message_received", handleMessageReceived);

    return () => {
      // socket.off("userIsConnected", connectedUser);
      socket.off("message_received", handleMessageReceived);
      socket.off("userJoined");
      // socket.disconnect();
    };
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleSendMessage(input) {
    const messageText = input.current.value;

    if (messageText !== "") {
      const messageData = {
        room: roomId,
        author: GetUserName(),
        message: messageText,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("send_message", { messageData });
      setMessages((prev) => [...prev, messageData]);
      input.current.value = "";
      input.current.focus();
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(messageInput);
    }
  };

  return render ? (
    <div
      className={`${
        grid ? grid : "px-[2em] pt-[6em] flex-grow"
      } flex flex-col p-[1em] bg-[#cce4dc1c]`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[1.5rem] font-black">Chat</h1>
        <label className="relative inline-flex z-max items-center cursor-pointer">
          <input
            onClick={() => {
              setAnonymously((prev) => !prev);
            }}
            type="checkbox"
            defaultValue
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Anonymous mode
          </span>
        </label>
      </div>

      {userInter ? (
        <p className="text-green-600 my-[1em]">
          You are connected with the user
        </p>
      ) : (
        ""
      )}
      <ScrollToBottom className="content-chat h-[50vh] flex-grow md:h-[68vh] overflow-handle py-[2em] flex-grow-handle">
        {messages.length ? (
          messages.map((message) => {
            return (
              <RenderMessage
                anonymously={anonymously}
                socket={socket.id}
                message={message}
              />
            );
          })
        ) : (
          <p>no messages until now. be the first one!</p>
        )}
      </ScrollToBottom>
      <div className="send-section flex justify-end justify-between my-[1em]">
        <input
          onKeyDown={handleKeyPress}
          ref={messageInput}
          type="text"
          maxLength="700"
          className="py-[0.8em] w-[80%] font-bold px-[1em] bg-[#ffffff29] rounded-lg w-full"
        />
        <button
          onClick={() => {
            handleSendMessage(messageInput);
          }}
          className="py-[0.5em] send-button-mb ml-[1em] main-text-gradient-background rounded"
        >
          {windowWidth > 765 ? (
            "Send"
          ) : (
            <BiSend size={30} className="mx-auto" />
          )}
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full flex-grow flex items-center justify-center">
      <ReactLoading
        type={"spin"}
        color={"#ea3cd2"}
        height={"50px"}
        width={"50px"}
      />
    </div>
  );
};

export default Chat;
