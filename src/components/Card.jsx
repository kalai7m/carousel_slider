import React from "react";

const Card = ({ name }) => {
  return name === "show" ? (
    <div className="bg-transparent relative px-72 h-64 snap-start">{""}</div>
  ) : (
    <div className="bg-darkBlack text-grassGreen-300 carousel-item text-center relative px-72 h-64 snap-start">
      {name}
    </div>
  );
};

export default Card;
