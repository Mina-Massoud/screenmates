import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactLoading from "react-loading";
import "animate.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";
import "video-react/dist/video-react.css"; // import css
import { Player } from "video-react";

const CreatePost = ({ sendPostToParentHandle }) => {
  const [previewURL, setPreviewURL] = useState(null);
  const [VideoURL, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const myTextArea = useRef(null);
  const userName = localStorage.getItem("userName");

  function handlePostData() {
    myTextArea.current.focused = false;

    if (myTextArea.current.value !== "" || previewURL || VideoURL) {
      axios
        .post(`${import.meta.env.VITE_PORT}/posts`, {
          publisher: userName,
          caption: myTextArea.current.value,
          mediaURL: previewURL? previewURL : VideoURL ? VideoURL : "",
        })
        .then(function (response) {
          // handle success
          Swal.fire("Published!", "Your Post has been Published!", "success");
          console.log(response);
          const postData = response.data;
          sendPostToParentHandle(postData);
          setPreviewURL("");
          setVideoUrl("");
          myTextArea.current.value = "";
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        });
    }
  }

  function createWidget() {
    var myCropWidget = cloudinary.createUploadWidget(
      {
        cloudName: "dik65evmf",
        uploadPreset: "z9w9zvet",
        folder: "widgetUpload",
        cropping: true,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          if (result.info.resource_type === "image") {
            setVideoUrl("");
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
            setPreviewURL(result.info.url);
          } else if (result.info.resource_type === "video") {
            // Set the desired width and height for the video
            const width = 640; // Replace with your desired width
            const height = 360; // Replace with your desired height
  
            // Extract the public ID from the result
            const publicId = result.info.public_id;
  
            // Construct the URL with the desired transformation
            const resizedVideoUrl = `https://res.cloudinary.com/dik65evmf/video/upload/b_blurred:400:15,c_pad,h_320,w_480/${publicId}.mp4`;
  
            setPreviewURL("");
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
            
            console.log(resizedVideoUrl);
            setVideoUrl(resizedVideoUrl);
          }
        }
      }
    );
    return myCropWidget;
  }
  

  // createWidget
  const myCropWidget = createWidget();

  //openWidget()
  function openWidget() {
    myCropWidget.open();
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      myTextArea.current.blur();
      if (myTextArea.current.value !== "") {
        Swal.fire({
          title: "Are you sure?",
          text: "You're about to Publish your Post",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Publish it!",
        }).then((result) => {
          if (result.isConfirmed) {
            handlePostData();
          }
        });
      }
    }
  };

  return (
    <div className="py-[0.8em] px-[0.5em] mb-[2em] w-[100%] rounded-lg mx-auto bg-[#5656562e] flex flex-col justify-center items-center">
      <textarea
        ref={myTextArea}
        onKeyDown={handleKeyPress}
        name=""
        className="post-textarea text-[1.2rem] bg-[#393939] mb-[1em] rounded-lg"
        placeholder="Tell your friends about your thoughts..."
        id=""
        cols="30"
        rows="1"
        maxLength={200}
      ></textarea>
      <div
        style={{
          backgroundImage: `url(${previewURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="img-with-filter-background rounded-lg w-full flex"
      >
        <div className="img-post bg-effect w-full">
          {!loading ? (
            previewURL ? (
              <img
                className="my-[2em] animate__animated animate__zoomIn w-fit mx-auto rounded-lg object-scale max-h-[500px]"
                src={previewURL}
                alt="Preview"
              />
            ) : VideoURL ? (
              <Player>
                <source src={VideoURL} />
              </Player>
            ) : null
          ) : (
            <div className="w-full py-[1.5em] flex-grow flex items-center justify-center">
              <ReactLoading
                type={"spin"}
                color={"#ea3cd2"}
                height={"50px"}
                width={"50px"}
              />
            </div>
          )}
        </div>
      </div>

      <div className="post-buttons flex mt-[1em] justify-between w-full">
        <div className="flex gap-[15px]">
          <button
            onClick={openWidget}
            className="custom-file-upload bg-[#393939] py-[0.5em] px-[1.5em] rounded-lg transition duration-300  cursor-pointer"
          >
            Upload
          </button>
          {previewURL || VideoURL ? (
            <button
              onClick={() => {
                if (previewURL) {
                  setPreviewURL("");
                }
                if (VideoURL) {
                  setVideoUrl("");
                }
              }}
              className="custom-file-upload bg-[#393939] py-[0.5em] px-[1.5em] rounded-lg transition duration-300  cursor-pointer"
            >
              Reset
            </button>
          ) : (
            ""
          )}
        </div>

        <button
          onClick={handlePostData}
          className="main-text-gradient-background create-post px-[1.5em] rounded-lg"
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
