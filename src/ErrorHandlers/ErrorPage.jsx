import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "animate.css";
import { useRouteError } from "react-router-dom";
const ErrorPageHandle = () => {
  const error = useRouteError();

  return (
    <div className="flex items-center error-bg justify-center animate__animated animate__fadeIn flex-grow  py-[10em] flex-col">
      <div className="relative top-[-2em] animate__animated animate__bounce">
        <h1 className="md:text-[20rem] text-[12rem] font-black text-center">
          {error && error.status ? error.status : "404"}
        </h1>
        <p className="main-text-gradient-color relative bottom-[2em] md:bottom-[3.5em] text-[1.5rem] font-black">
          {error
            ? error.message
              ? error.message
              : "An unexpected error occurred."
            : "Oops! Page not found."}
        </p>
        {!error &&  <p className="text-center">Looks like you've ventured off the map.</p>}
       
      </div>
      <Link
        to="/"
        className="main-text-gradient-background py-[0.5em] px-[2em] rounded-full mb-[2em] hover:scale-[1.1] transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPageHandle;
