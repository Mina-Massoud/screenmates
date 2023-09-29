import React, { useRef, useState } from "react";
import axios from "axios";
const EditComment = ({ onCancel, initialValue, postId, id }) => {
  const [editedCaption, setEditedCaption] = useState(initialValue);


  console.log(postId);
  function handlConfirming() {
    console.log("ssssss ", postId);
    axios
      .put(`${import.meta.env.VITE_PORT}/posts/${postId}/comments/${id}`, {
        caption: editedCaption, // Assuming commentData holds your comment content
      })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col">
      <input
        value={editedCaption}
        onChange={(event) => {
          setEditedCaption(event.target.value);
        }}
        type="text"
        className="w-full bg-black py-[0.5em] px-[1em] rounded-lg"
      />{" "}
      <div className="flex items-center justify-end gap-[10px] my-[1em]">
        <button
          onClick={() => {
            handlConfirming();
            onCancel(editedCaption);
          }}
          className="text-[1rem] main-text-gradient-background px-[1.2em] py-[0.5em] rounded-full"
        >
          Confirm
        </button>
        <button
          onClick={() => {
            onCancel();
          }}
          className="text-[1rem] border px-[1.2em] py-[0.5em] rounded-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditComment;
