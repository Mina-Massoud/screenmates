import React, { useState } from "react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
const { Element, scroller } = Scroll;

const LandPage = (props) => {
  // State to control the visibility of buttons
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className="flex-grow pt-[12em] pb-[3em] land-bg land-page font-black text-white">
      <section className="main-grid">
        <div className="home-title">
          <div className="home-main-title">
            {/* Main title */}
            <h1 className="text-[2rem] animate__animated animate__zoomIn sm:text-[3rem] font-black">
              <span className="main-text-gradient-color main-title-span">
                Screenmates
              </span>{" "}
              Your Gateway to Social Fun and Activities!
            </h1>
          </div>
          {/* Description */}
          <p className="transparent-color my-[2em] text-[1.3rem] mb-[5em]">
            Where Social Media Meets Real-Time Fun! Join our vibrant community
            for interactive activities and shared virtual experiences. Connect,
            play, and engage like never before!
          </p>
          {/* Buttons */}
          <div className="buttons flex pb-[5em]">
            <Link
              to="/register"
              className="main-text-gradient-background py-[1em] px-[3em] mr-[1em] rounded-full font-black"
            >
              Start Now
            </Link>
          </div>
        </div>
      </section>
      {/* Section about the purpose */}
      <Element className="rooms-available rooms-flow-grid">
        <h1 className="text-center border-t border-[#7a326d] letter-space py-[1em] mt-[2em] font-black rooms-title text-[2rem]">
          Why We Build{" "}
          <span className="main-text-gradient-color">Screenmate</span>{" "}
        </h1>
        <div className="col-start-2 about-page col-end-4">
          {/* Vision and purpose */}
          <h2 className="text-[2rem] line-height border-b border-[#7a326d] pb-[3em]">
            {" "}
            Our vision was to create a platform where users could not only
            connect through messages and posts but also share immersive
            experiences in real-time.
          </h2>
          <p className="text-[1.5rem] my-[1.3em]">
            We wanted to break the barriers of traditional social networks and
            offer a space where individuals could interact, play, and
            collaborate in virtual rooms, just like in real life.
          </p>
        </div>
      </Element>
    </div>
  );
};

export default LandPage;
