import React from "react";
import { BsSearch } from "react-icons/bs";
import SearchContainer from "./SearchContainer";
import { useState } from "react";
const SearchComponent = ({ getData, showContainer }) => {
  const [searchData, setSearchData] = useState("");

  return (
    <div className="w-full relative mx-[1em]">
      <div className="min-w-[60px] relative ml-auto max-w-[300px]">
        <input
          value={searchData}
          onChange={(event) => {
            setSearchData(event.target.value);
            getData(event.target.value);
          }}
          type="text"
          className="py-[0.7em] w-full px-[1.2em] text-[1.2rem] font-black rounded-full bg-transparent border"
        />
        {!searchData && (
          <BsSearch className="absolute right-[1.6em] vertical-center" />
        )}
      </div>
      {showContainer && (
        <SearchContainer
          searchData={searchData}
          className="absolute animate__animated animate__fadeIn w-full max-w-[500px] right-0 min-w-[250px] rounded-lg my-[1em] bg-[#ffffff24] bg-effect p-[0.4em]"
        />
      )}
    </div>
  );
};

export default SearchComponent;
