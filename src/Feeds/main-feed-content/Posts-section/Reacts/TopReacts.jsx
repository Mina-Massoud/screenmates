import React from "react";
import Thunder from "../../../../media/Reacts/Thunder.gif";
import Amazing from "../../../../media/Reacts/Amazing.gif";
import Dislike from "../../../../media/Reacts/dislike.gif";
import Love from "../../../../media/Reacts/heart.gif";
import Shit from "../../../../media/Reacts/shit.gif";
import Skull from "../../../../media/Reacts/Skull.gif";
import ReactStyle from "../../../../helperalgo/ReactsStyle";
const TopReactsRender = ({ totalNumberOfReacts, reactType = "" }) => {
  const styleHandle = ReactStyle();
  // Create a mapping of react prop values to image import paths
  const reactImageMap = {
    Thunder,
    Amazing,
    Dislike,
    Love,
    Shit,
    Skull,
  };

  // Use the mapping to set the imgSrc dynamically
  const imgSrc = reactImageMap[reactType] || "";

  console.log(imgSrc);
  if (!imgSrc) { 
    return
  }
  return (
    <div className="flex items-center py-[1em]">
      <img
        src={imgSrc}
        name={reactType}
        className={`h-full ${styleHandle[reactType]} w-[30px] h-[30px] p-[0.35em] react rounded-full`}
        alt=""
      />
    </div>
  );
};

export default TopReactsRender;
