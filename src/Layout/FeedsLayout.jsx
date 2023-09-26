import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const FeedsLayout = (props) => {
  return (
    <div className="overflow-none flex flex-grow max-h-[100vh]">
      {/* <Header /> */}
      <Outlet />
    </div>
  );
};

export default FeedsLayout;
