import React from "react";
import "animate.css";
import { useEffect } from "react";
import axios from "axios";
const DropDownPostsList = ({ id, isDeleted, isEdit }) => {
  function deletePostHandler(id) {
    axios
      .delete(`https://screenmates.onrender.com/posts/${id}`)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function deletePostEffect(param) {
    isDeleted(param);
  }

  function editPostEffect(param) {
    isEdit(param);
  }

  return (
    <ul className="absolute animate__animated animate__fadeIn z-max bg-black w-[150px] left-[-130px] rounded-lg top-[2em] overflow-none">
      <li
        onClick={() => {
          editPostEffect(id);
        }}
        className="py-[1em] border-b border-gray-500 cursor-pointer hover:bg-[#262626] transition duration-300 px-[1em]"
      >
        Edit
      </li>
      <li
        onClick={() => {
          deletePostHandler(id);
          deletePostEffect("Deleted");
        }}
        className="py-[1em] cursor-pointer px-[1em] hover:bg-[#262626] transition duration-300"
      >
        Delete
      </li>
    </ul>
  );
};

export default DropDownPostsList;
