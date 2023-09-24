import React from "react";
import "animate.css";

const Contact = (props) => {
  return (
    <div className="flex-grow flex pt-[6em] items-center contact-bg justify-center">
      <div className="contact-grid animate__animated animate__zoomIn">
        <h1 className="contact-title text-[3rem] pt-[1em] font-black">
          <span className="main-text-gradient-color">Reach Out with us</span>{" "}
          Share Feedback or Report Issues
        </h1>
        <div className="contact-cont flex flex-col">
          <input
            type="text"
            className="contact-name text-[1.5rem] my-[1em] border-b pb-[0.3em] bg-transparent"
            placeholder="Your name"
          />
          <input
            type="text"
            className="contact-name text-[1.5rem] my-[1em] border-b pb-[0.3em] bg-transparent"
            placeholder="Your email"
          />
          <textarea
            name=""
            id=""
            className="contact-message bg-transparent text-[1.5rem] my-[1em] border-b pb-[0.3em] bg-transparent"
            placeholder="Tell us your message"
            cols="30"
            rows="10"
          ></textarea>
          <button className="py-[1em] w-fit px-[3em] text-black bg-white font-bold my-[1.5em]">Send</button>
        </div>
      </div>{" "}
    </div>
  );
};

export default Contact;
