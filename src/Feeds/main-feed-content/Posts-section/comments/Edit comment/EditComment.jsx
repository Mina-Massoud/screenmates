import React, { useRef, useState } from "react";

const EditComment = ({ onCancel, initialValue }) => {
  const [editedCaption, setEditedCaption] = useState(initialValue);

  function handlConfirming() {
    axios
      .put(`${import.meta.env.VITE_PORT}/posts/${id}`)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
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
        className="w-full py-[0.5em] px-[1em] rounded-lg"
      />{" "}
      <div className="flex items-center justify-end gap-[10px] my-[1em]">
        <button
          onClick={() => {
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
