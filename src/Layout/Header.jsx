import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { VscListFlat } from "react-icons/vsc";
import SearchComponent from "../Search/SearchComponent";
import { useEffect } from "react";
import { useRef } from "react";
const Header = ({ StopSearch, setShowParent }) => {
  const [showDrop, setShowDrop] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Use a flag to track whether it's the first render
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Check if it's not the first render
    if (!isFirstRender.current) {
      setShowSearch(!StopSearch); // Invert the value of showSearch based on stopSearch
    } else {
      // If it's the first render, set the flag to false
      isFirstRender.current = false;
    }
  }, [StopSearch]);

  function handleSearchData(data) {
    setShowSearch(data);
    setShowParent(false);
  }

  const userName = localStorage.getItem("userName");

  function handleShowDrop() {
    setShowDrop((prev) => !prev);
  }

  return (
    <>
      <ul
        className={`drop ${
          showDrop && "drop-show"
        } header-elements bg-effect z-max border-l fixed right-0 h-[100vh] px-[2em] py-[2em]`}
      >
        <AiFillCloseCircle
          onClick={handleShowDrop}
          className="mx-auto mb-[5em] cursor-pointer"
          size={30}
        />
        <div className="cont-li flex flex-col items-center">
          <Link to="..">
            <li className="block">Home</li>
          </Link>
          <Link to="/feeds">
            <li className="block">Feeds</li>
          </Link>
          <Link to="/rooms">
            <li className="block">Rooms</li>
          </Link>
          <Link to="/chat">
            <li className="block">Chat</li>
          </Link>
          <Link to={`/profile/${userName}`}>
            <li>Profile</li>
          </Link>
          <Link to="/contact">
            <li className="block">Contact</li>
          </Link>
        </div>
      </ul>
      <div className="p-[2em] w-full z-[9999] absolute flex items-center justify-between">
        <Link
          className="main-text-gradient-color text-[1.5rem] font-black"
          to=".."
        >
          Screenmates
        </Link>
        <SearchComponent
          showContainer={showSearch}
          getData={handleSearchData}
        />
        <VscListFlat
          size={30}
          className="list-icon cursor-pointer min-w-[50px]"
          onClick={handleShowDrop}
        />
        <ul className="flex big-ul header-elements">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/feeds">
            <li>Feeds</li>
          </Link>
          <Link to="/rooms">
            <li>Rooms</li>
          </Link>
          <Link to="/chat">
            <li>Chat</li>
          </Link>
          <Link to={`/profile/${userName}`}>
            <li>Profile</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Header;
