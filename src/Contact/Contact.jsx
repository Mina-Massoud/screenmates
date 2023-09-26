import React, { useEffect, useRef, useState } from "react";
import "animate.css";
import { useForm, ValidationError } from "@formspree/react";

const Contact = (props) => {
  const [state, handleSubmit] = useForm("xeqbrygw");
  const form = useRef();

  useEffect(() => {
    if (state.succeeded) {
      resetForm(); // Clear form fields on successful submission
    }
  }, [state.succeeded]);

  const resetForm = () => {
    form.current.reset(); // Reset form fields
  };

  if (state.errors) {
    console.log(state.errors.getFormErrors());
  }

  return (
    <div className="flex-grow flex  items-center contact-bg justify-center py-[15em]">
      <div className="contact-grid animate__animated animate__zoomIn">
        <h1 className="contact-title text-[3rem] pt-[1em] font-black">
          <span className="main-text-gradient-color">Reach Out with Us</span>{" "}
          Share Feedback or Report Issues
        </h1>
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="contact-cont flex flex-col"
        >
          <input
            id="name"
            type="name"
            required
            name="name"
            className="contact-name text-[1.5rem] my-[1em] border-b pb-[0.3em] bg-transparent"
            placeholder="Your name"
          />
          <input
            id="email"
            type="email"
            name="email"
            required
            className="contact-name text-[1.5rem] my-[1em] border-b pb-[0.3em] bg-transparent"
            placeholder="Your email"
          />
          <textarea
            id="message"
            type="message"
            name="message"
            className="contact-message bg-transparent text-[1.5rem] my-[1em] border-b pb-[0.3em] bg-transparent"
            placeholder="Tell us your message"
            cols="30"
            required
            rows="10"
          ></textarea>

          <button
            type="submit"
            className="py-[1em] w-fit px-[3em] text-[1.2rem] text-black bg-white font-bold my-[1.5em]"
            disabled={state.submitting}
          >
            {state.submitting ? "Sending..." : "Send"}
          </button>

          {state.errors ? (
            <p className="text-red-500 text-[1.2rem]">
              {state.errors.getFormErrors().length
                ? state.errors.getFormErrors()[0].message
                : state.errors.getAllFieldErrors().length
                ? state.errors.getAllFieldErrors()[0][1][0].message
                : ""}
            </p>
          ) : state.succeeded ? (
            <p className="text-green-500 text-[1.2rem]">
              Form is sended sucessfully!
            </p>
          ) : (
            ""
          )}
        </form>
      </div>{" "}
    </div>
  );
};

export default Contact;
