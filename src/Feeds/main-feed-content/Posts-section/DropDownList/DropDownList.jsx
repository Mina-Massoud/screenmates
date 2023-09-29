import React from "react";
import "animate.css";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const DropDownPostsList = ({ id, isDeleted, isEdit, comment }) => {
  function deletePostHandler(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You're about to Delete your Post",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_PORT}/posts/${id}`)
          .then(function (response) {
            // handle success
            deletePostEffect("Deleted");
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    });
  }

  function deleteCommentHandler(id) {
    axios
      .delete(`${import.meta.env.VITE_PORT}/posts/${id}`)
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
    <ul
      className={`absolute animate__animated animate__fadeIn z-max bg-black w-[150px] ${
        !comment ? "left-[-130px] top-[2em]" : "left-[0] top-[3em]"
      }  rounded-lg overflow-none`}
    >
      <li
        onClick={() => {
          editPostEffect(id);
        }}
        className="py-[1em] border-b border-gray-500 cursor-pointer hover:bg-white hover:text-black transition duration-300 px-[1em]"
      >
        Edit
      </li>
      <li
        onClick={() => {
          if (!comment) {
            deletePostHandler(id);
          } else deleteCommentHandler(id);
        }}
        className="py-[1em] cursor-pointer px-[1em] hover:bg-white hover:text-black transition duration-300"
      >
        Delete
      </li>
    </ul>
  );
};

export default DropDownPostsList;
