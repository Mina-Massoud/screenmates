import React, { useEffect, useState } from "react";
import SearchResultRender from "./SearchResultRender";
import classNames from "classnames";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

const SearchContainer = ({ className, searchData }) => {
  const [searchResult, setSearchResult] = useState();

  useEffect(() => {
    console.log("entered");
    axios
      .get(`${import.meta.env.VITE_PORT}/users?userName=${searchData}`)
      .then((response) => {
        // Handle the response here
        setSearchResult(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }, [searchData]);

  const ClassName = classNames(className);

  return (
    searchResult && (
      <div className={ClassName}>
        {searchResult.count ? (
          <ScrollToBottom className="max-h-[50vh] flex-grow overflow-handle">
            {searchResult.users.map((user) => {
              return <SearchResultRender data={user} key={user.id} />;
            })}
          </ScrollToBottom>
        ) : (
          <h1 className="text-[1.3rem]">No users found!</h1>
        )}
      </div>
    )
  );
};

export default SearchContainer;
