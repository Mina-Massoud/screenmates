import React, { useContext, useEffect, useRef, useState } from "react";
import Thunder from "../../../../media/Reacts/Thunder.gif";
import Amazing from "../../../../media/Reacts/Amazing.gif";
import Dislike from "../../../../media/Reacts/dislike.gif";
import Love from "../../../../media/Reacts/heart.gif";
import empty from "../../../../media/Reacts/heart-empty.png";
import Shit from "../../../../media/Reacts/shit.gif";
import Skull from "../../../../media/Reacts/Skull.gif";
import selectSound from "../../../../media/sounds/SelectSound.mp3";
import UnselectSound from "../../../../media/sounds/unSelectSound.mp3";
import "animate.css";
import axios from "axios";
import GetUserName from "../../../../APIS/getUserName";
import ReactStyle from "../../../../helperalgo/ReactsStyle";
import { LayoutContext } from "../../../../Layout/Layout";
const Reacts = ({ id, reactType }) => {
  const [showReacts, setShowReacts] = useState(false);
  const [flagHover, setFlagHover] = useState(false);
  const hideReacts = useContext(LayoutContext);

  useEffect(() => {
    console.log("entered");
    if (hideReacts.hideChild) {
      console.log("s");
      setShowReacts(false);
      hideReacts.hideChildHandler(false);
    }
  }, [hideReacts.hideChild]);

  const ReactImges = {
    Thunder,
    Amazing,
    Dislike,
    Love,
    Shit,
    Skull,
  };
  const styleHandle = ReactStyle();
  const delay = 1000;
  const startPress = useRef();
  const touchTimeOut = useRef(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update the screenWidth state when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Attach the resize event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [ReactSelected, setReactSelected] = useState({
    ReactType: reactType ? reactType : "",
    ImgSrc: reactType ? ReactImges[reactType] : empty,
    activeColor: reactType ? styleHandle[reactType] : styleHandle.None,
  });

  useEffect(() => {
    let showReactDelay;
    let closeReactsDelay;

    if (screenWidth > 768) {
      if (flagHover) {
        showReactDelay = setTimeout(() => {
          setShowReacts(true);
        }, 700);
      } else {
        closeReactsDelay = setTimeout(() => {
          setShowReacts(false);
        }, 600);
      }
    }

    return () => {
      clearTimeout(showReactDelay);
      clearTimeout(closeReactsDelay);
    };
  }, [flagHover]);

  function touchStart() {
    startPress.current = Date.now();
    touchTimeOut.current = setTimeout(() => {
      setShowReacts(true);
    }, delay);
  }

  function touchEnd() {
    if (Date.now() - startPress.current < delay) {
      console.log("cancel holding");
      clearTimeout(touchTimeOut.current);
    }
  }

  function handleReactSelected(event) {
    console.log(ReactSelected.ReactType);
    if (ReactSelected.ReactType === event.target.name) {
      const ClickSoundEffect = new Audio(UnselectSound);
      ClickSoundEffect.volume = 0.6;
      ClickSoundEffect.play();
      axios
        .delete(
          `${import.meta.env.VITE_PORT}/${id}/reacts?publisher=${GetUserName()}`
        )
        .then((response) => {
          // Handle the response here
          console.log(response);
        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });
      setReactSelected({
        ReactType: "",
        ImgSrc: empty,
        activeColor: "bg-transparent",
      });
      setShowReacts(false);
      return 0;
    }
    const target = event.target;
    target.src = target.name === "Love" ? Love : target.src;

    setReactSelected({
      ReactType: target.name,
      ImgSrc: target.src,
      activeColor: styleHandle[target.name],
    });

    axios
      .post(`${import.meta.env.VITE_PORT}/posts/${id}/reacts`, {
        publisher: GetUserName(),
        reactType: event.target.name,
      })
      .then((response) => {
        // Handle the response here
        console.log(response);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });

    const ClickSoundEffect = new Audio(selectSound);
    ClickSoundEffect.volume = 0.6;
    ClickSoundEffect.play();

    setShowReacts(false);
  }

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu
  };

  return (
    <div
      className="z-max"
      onClick={() => {
        console.log("clikec");
      }}
    >
      <div
        onMouseLeave={() => {
          setFlagHover(false);
        }}
        onMouseEnter={() => {
          setFlagHover(true);
        }}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        className={`flex animate__animated z-[9999999] animate__bounceIn reacts ${
          showReacts && "reacts-hover"
        }`}
      >
        <img
          onClick={(event) => {
            handleReactSelected(event);
          }}
          src={showReacts ? Love : ReactSelected.ImgSrc}
          draggable={false}
          name="Love"
          className={`${
            !showReacts
              ? "first-child-mr-handle " + styleHandle[ReactSelected.ReactType]
              : styleHandle.Love
          } h-full p-[0.35em] rounded-full select-none`}
          alt=""
          onContextMenu={handleContextMenu}
        />
        <img
          onClick={(event) => {
            handleReactSelected(event);
          }}
          src={Thunder}
          name="Thunder"
          className={`h-full ${styleHandle.Thunder}  p-[0.35em] react rounded-full`}
          alt=""
        />
        <img
          onClick={(event) => {
            handleReactSelected(event);
          }}
          src={Amazing}
          name="Amazing"
          className={`h-full ${styleHandle.Amazing} p-[0.35em] rounded-full`}
          alt=""
        />
        <img
          onClick={(event) => {
            handleReactSelected(event);
          }}
          src={Dislike}
          name="Dislike"
          className={`h-full ${styleHandle.Dislike} p-[0.35em] rounded-full`}
          alt=""
        />
        <img
          onClick={(event) => {
            handleReactSelected(event);
          }}
          src={Skull}
          name="Skull"
          className={`h-full ${styleHandle.Skull} p-[0.35em] rounded-full`}
          alt=""
        />
        <img
          onClick={(event) => {
            handleReactSelected(event);
          }}
          src={Shit}
          name="Shit"
          className={`h-full ${styleHandle.Shit} p-[0.35em] rounded-full`}
          alt=""
        />
      </div>
    </div>
  );
};

export default Reacts;
