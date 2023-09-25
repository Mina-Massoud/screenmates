import React, { useEffect, useState } from "react";
import Post from "../Post";
import Comment from "./CommentRender";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";
import GetUserName from "../../../../APIS/getUserName";
import { useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactLoading from "react-loading";
import "animate.css";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PostDetails = ({ id, close = false, sendReactToParentFeeds }) => {
  const [data, setData] = useState();
  const [commentData, setCommentData] = useState();
  const [flag, setFlag] = useState(false);
  const [closed, setClosed] = useState(close);
  const [closeSelf, setCloseSelf] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  let MyInput = useRef();
  const param = useParams();

  console.log(param);

  useEffect(() => {
    if (!id) {
      id = param.id;
      setCloseSelf(true);
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://screenmates-beta-v.onrender.com/posts/${id}?req=${GetUserName()}`
      ) // Pass an object with key-value pairs
      .then(function (response) {
        // handle success
        setData(response.data[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [flag]);

  function handleSendComment() {
    const publisher = GetUserName();
    axios
      .post(`https://screenmates-beta-v.onrender.com/posts/${id}/comments`, {
        publisher: publisher,
        caption: commentData, // Assuming commentData holds your comment content
      })
      .then(function (response) {
        // handle success
        setCommentData(response.data[0]);
        setFlag((prev) => !prev);
        MyInput.current.value = "";
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function sendReactToParent(data) {
    sendReactToParentFeeds(data);
  }

  function handleCloseEffect() {
    setClosed(true);
    setCloseSelf(false);
    navigate(location.state ? location.state : "..");
  }

  if (!data) {
    return (
      <div className="fixed flex animate__animated animate__zoomIn left-0 items-center justify-center w-full  full-center bg-effect z-max h-[100vh]">
        <ReactLoading
          type={"spin"}
          color={"#ea3cd2"}
          height={"50px"}
          width={"50px"}
        />
      </div>
    );
  }

  console.log(id);

  return (
    <div
      className={`fixed w-full full-center ${
        closed
          ? "animate__animated animate__zoomOut"
          : "animate__animated animate__zoomIn"
      } overflow-y-auto bg-effect flex justify-center pt-[4em] z-max min-h-[100vh]`}
    >
      {closeSelf && (
        <div className="bg-black fixed top-[0em] z-max w-full h-[80px]">
          <AiOutlineClose
            onClick={handleCloseEffect}
            className=" vertical-center cursor-pointer border  bg-white text-black left-5 rounded-full p-[0.2em]"
            size={25}
          />
        </div>
      )}
      <div className="flex-grow fixed top-[8em] comments-grid grid-rows-max-content">
        <div className="posts-cont col-start-2 md:mr-[2em]">
          <Post
            child={true}
            data={data}
            sendReactToParent={sendReactToParent}
          />
        </div>
        <div className="comments my-[1.5em] col-start-2 flex flex-col">
          <h1 className="text-[1.5rem] font-black px-[0.5em] pb-[1.5em]">
            Comments
          </h1>
          <div className="comments-section flex flex-col flex-grow">
            {data.initialComments && (
              <ScrollToBottom className="comments-render max-h-[67vh] overflow-handle">
                {data.initialComments.map((comment) => {
                  return <Comment key={comment._id} data={comment} />;
                })}
              </ScrollToBottom>
            )}

            <div className="input-cont relative mt-[2em] flex">
              <input
                ref={MyInput}
                type="text"
                className="py-[0.8em] mt-auto w-full border px-[1em] rounded-full bg-transparent"
                placeholder="Write Comment.."
                onChange={(event) => {
                  setCommentData(event.target.value);
                }}
              />
              <AiOutlineSend
                onClick={handleSendComment}
                size={25}
                className="absolute right-5 hover:cursor-pointer AiOutlineSend vertical-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
