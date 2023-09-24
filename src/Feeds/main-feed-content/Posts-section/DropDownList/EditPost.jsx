import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const EditPost = ({ Initialvalue, postId, onCancel }) => {
  const [isConfirmed, setIsConfirmed] = useState();
  const [isCanceled, setIsCanceled] = useState();
  const [value, setValue] = useState(Initialvalue);
  const [flag, setFlag] = useState();

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  function handleConfirmButton() {
    if (!value) {
      setFlag(true);
      return;
    }
    setIsConfirmed("confirming");
    axios
      .put(`https://screenmates.onrender.com/posts/${postId}`, {
        caption: value,
      })
      .then(function (response) {
        // handle success
        Swal.fire("Edited!", "Your Post has been Edited!", "success");
        console.log(response);
        handleCancelButton(value);
        setValue("");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
        });
        setIsConfirmed(false);
      });
  }

  function handleCancelButton(param) {
    onCancel(param);
  }

  return (
    <div className="my-[1em]">
      <textarea
        autoFocus
        onKeyDown={handleKeyPress}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        value={value}
        name=""
        className="post-textarea text-[1.2rem] bg-[#393939] rounded-lg"
        placeholder="Tell your friends about your thoughts..."
        id=""
        cols="30"
        rows="1"
        maxLength={200}
      ></textarea>
      {flag && (
        <p className="text-red-600 mb-[1em]">This item cannot be empty</p>
      )}
      <div className="flex gap-[10px]">
        <button
          onClick={handleConfirmButton}
          className="main-text-gradient-background p-2 rounded px-[1.4em]"
        >
          {isConfirmed === "confirming" ? "Confirming..." : "Confirm"}
        </button>
        <button
          onClick={() => {
            handleCancelButton(false);
          }}
          className="bg-red-600 p-2 rounded px-[1.4em]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPost;
