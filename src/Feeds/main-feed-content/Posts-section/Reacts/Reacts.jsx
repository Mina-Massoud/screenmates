import React, { useEffect, useState } from "react";
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
const Reacts = ({ id, reactType }) => {
  const [showReacts, setShowReacts] = useState(false);
  const [flagHover, setFlagHover] = useState(false);
  const ReactImges = {
    Thunder,
    Amazing,
    Dislike,
    Love,
    Shit,
    Skull,
  };
  const styleHandle = ReactStyle();

  const [ReactSelected, setReactSelected] = useState({
    ReactType: reactType ? reactType : "",
    ImgSrc: reactType ? ReactImges[reactType] : empty,
    activeColor: reactType ? styleHandle[reactType] : styleHandle.None,
  });

  useEffect(() => {
    let showReactDelay;
    let closeReactsDelay;

    if (flagHover) {
      showReactDelay = setTimeout(() => {
        setShowReacts(true);
      }, 700);
    } else {
      closeReactsDelay = setTimeout(() => {
        setShowReacts(false);
      }, 600);
    }

    return () => {
      clearTimeout(showReactDelay);
      clearTimeout(closeReactsDelay);
    };
  }, [flagHover]);

  function handleReactSelected(event) {
    if (ReactSelected.ReactType === event.target.name || ReactSelected.ReactType) {
      const ClickSoundEffect = new Audio(UnselectSound);
      ClickSoundEffect.volume = 0.6;
      ClickSoundEffect.play();
      axios
        .delete(
          `https://screenmates-beta-v.onrender.com/${id}/reacts?publisher=${GetUserName()}`
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
      .post(`https://screenmates-beta-v.onrender.com/posts/${id}/reacts`, {
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

  return (
    <div
      onMouseLeave={() => {
        setFlagHover(false);
      }}
      onMouseOver={() => {
        setFlagHover(true);
      }}
      onTouchStart={() => {
        setFlagHover(true);
      }}
      className={`flex animate__animated z-[9999999] animate__bounceIn reacts ${
        showReacts && "reacts-hover"
      }`}
    >
      <img
        onClick={(event) => {
          handleReactSelected(event);
        }}
        src={showReacts ? Love : ReactSelected.ImgSrc}
        name="Love"
        className={`${
          !showReacts
            ? "first-child-mr-handle " + styleHandle[ReactSelected.ReactType]
            : styleHandle.Love
        } h-full p-[0.35em] rounded-full`}
        alt=""
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
  );
};

export default Reacts;
