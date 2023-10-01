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
import InfiniteScroll from "react-infinite-scroll-component";

const PostDetails = ({ id, close = false, sendReactToParentFeeds }) => {
  const [data, setData] = useState();
  const [commentData, setCommentData] = useState();
  const [closed, setClosed] = useState(close);
  const [closeSelf, setCloseSelf] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [delayTime, setDelayTime] = useState(0);
  let MyInput = useRef();
  const param = useParams();
  const [commentsList, setCommentsList] = useState([]);
  const [hasMoreState, setHasMoreState] = useState(true);
  const pageNumber = useRef(0);

  useEffect(() => {
    if (!id) {
      console.log(param.id);
      id = param.id;
      setCloseSelf(true);
    }
  }, []);

  function fetchData() {
    if (!id) {
      id = param.id;
    }
    pageNumber.current = pageNumber.current + 1;
    axios
      .get(
        `${import.meta.env.VITE_PORT}/posts/${id}/comments?offset=${
          pageNumber.current
        }&limit=6`
      ) // Pass an object with key-value pairs
      .then(function (response) {
        // handle success
        if (!response.data.length) {
          setHasMoreState(false);
        }
        console.log(response.data);
        setCommentsList((prev) => [...prev, ...response.data]);
      })
      .catch(function (error) {
        // handle error
      });
  }

  useEffect(() => {
    if (!id) {
      id = param.id;
    }
    axios
      .get(`${import.meta.env.VITE_PORT}/posts/${id}?req=${GetUserName()}`) // Pass an object with key-value pairs
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  function handleSendComment() {
    if (!id) {
      id = param.id;
    }
    if (delayTime) {
      if (Date.now() - delayTime < 2000) {
        setSending("MANY REQUESTS");
        setDelayTime(Date.now());
        return 0;
      }
    }

    setDelayTime(Date.now());
    setSending("sending");
    const publisher = GetUserName();

    axios
      .post(`${import.meta.env.VITE_PORT}/posts/${id}/comments`, {
        publisher: publisher,
        caption: commentData, // Assuming commentData holds your comment content
      })
      .then(function (response) {
        // handle success
        setCommentsList((prev) => [response.data, ...prev]);
        setSending(false);
        MyInput.current.value = "";
      })
      .catch(function (error) {
        // handle error
        setSending("error");
      });
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Enter key was pressed, you can perform your desired action here
      handleSendComment();
    }
  };

  function sendReactToParent(data) {
    sendReactToParentFeeds(data);
  }

  function handleCloseEffect() {
    setClosed(true);
    setCloseSelf(false);
    navigate(location.state ? location.state : "..");
  }

  if (!data || !commentsList) {
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

  return (
    <div
      className={`fixed w-full full-center ${
        closed
          ? "animate__animated animate__zoomOut"
          : "animate__animated animate__zoomIn"
      } overflow-y-auto bg-effect flex justify-center pt-[4em] z-max min-h-[100vh]`}
    >
      {closeSelf && (
        <div className="bg-black left-0 fixed top-[0em] z-max w-full h-[80px]">
          <AiOutlineClose
            onClick={handleCloseEffect}
            className=" vertical-center cursor-pointer border text-black left-5 rounded-full p-[0.2em]"
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
            {commentsList && (
              <div
                id="comment_scroll"
                className="comments-render max-h-[67vh] overflow-handle"
              >
                <InfiniteScroll
                  dataLength={commentsList.length}
                  next={fetchData}
                  hasMore={hasMoreState}
                  scrollableTarget="comment_scroll"
                  loader={<h4>Loading...</h4>}
                >
                  {commentsList.map((comment) => {
                    return (
                      <Comment
                        postId={data._id}
                        key={comment._id}
                        data={comment}
                      />
                    );
                  })}
                </InfiniteScroll>
              </div>
            )}
            {sending === "sending" ? (
              <p>Sending...</p>
            ) : sending === "error" ? (
              <p className="text-red-600">
                An error has occurred. Please try again.
              </p>
            ) : sending === "MANY REQUESTS" ? (
              <p className="text-yellow-600">Excessive requests detected.</p>
            ) : (
              ""
            )}

            <div className="input-cont relative mt-[2em] flex">
              <input
                onKeyDown={handleKeyPress}
                ref={MyInput}
                type="text"
                className="py-[0.8em] mt-auto w-full border px-[1em] rounded-full bg-black"
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
