import React, { useEffect, useState } from "react";
import ImgTitle from "../media/home-img.png";
import Scroll from "react-scroll";
import RoomCard from "../RoomSection/Room-card";
import { Link } from "react-router-dom";
const { Element, scroller } = Scroll;
import "animate.css";
import axios from "axios";

const Home = (props) => {
  const [render, setRender] = useState(true);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 1500);
  }, []);

  useEffect(() => {
    axios
      .get(`https://screenmates.onrender.com/rooms`)
      .then(function (response) {
        console.log(response.data);
        setRooms(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return render ? (
    <main className="home pt-[12em] pb-[2em] bg-background">
      <section className="main-grid">
        <div className="home-title">
          <div className="home-main-title">
            <h1 className="text-[2rem] animate__animated animate__zoomIn sm:text-[3rem] font-black">
              Watch And Get New Friends With,{" "}
              <span className="main-text-gradient-color main-title-span">
                Screenmates
              </span>
            </h1>
          </div>
          <p className="transparent-color my-[2em] mb-[5em]">
            Make friends while watching! Host or join virtual watch parties,
            connect with like-minded individuals, and enjoy the shared
            experience of watching your favorite shows, movies, or sports.
          </p>
          <div className="buttons flex">
            <button
              className="main-text-gradient-background py-[0.5em] px-[7%] mr-[1em] rounded-full font-black"
              onClick={() =>
                scroller.scrollTo("rooms-available", {
                  duration: 800,
                  delay: 100,
                  smooth: true,
                  offset: -50, // Optional offset, adjust as needed
                })
              }
            >
              Explore
            </button>
            <Link
              to="rooms"
              className="border py-[0.5em] px-[7%] rounded-full font-black transition duration-300 hover:bg-white hover:text-black"
            >
              Rooms
            </Link>
          </div>
        </div>
        <div className="img-title">
          <img src={ImgTitle} alt="" />
        </div>
      </section>
      <Element className="rooms-available rooms-flow-grid">
        <h1 className="text-center py-[4em] font-black rooms-title text-[2rem]">
          Feeling bored? Join any Room Now and{" "}
          <span className="main-text-gradient-color">make new friends!</span>
          <br />
          <span className="">
            من الاخر لو معندكش صحاب استخدم
            <span className="main-text-gradient-color"> البتاع دا</span>
          </span>
        </h1>
        <h2 className="rooms-main-section-title text-[2rem] font-black">
          Live Rooms{" "}
          <span
            className={`text-[1.2rem] ${
              rooms.count ? "text-green-600" : "text-red-600"
            } font-normal`}
          >
            {" "}
            ({rooms.count} rooms availabe)
          </span>
        </h2>
        <section>
          {rooms.rooms && rooms.rooms.length > 0 ? (
            rooms.rooms.map((item, index) => (
              <RoomCard key={Math.random()} data={item} />
            ))
          ) : (
            <h1>No Rooms available at the moment...</h1>
          )}
        </section>
      </Element>
    </main>
  ) : (
    <div className="flex-grow flex items-center justify-center">
      {" "}
      <h1 className="font-black text-[3rem] animate__animated animate__zoomIn">
        Preparing your account...
      </h1>
    </div>
  );
};

export default Home;
