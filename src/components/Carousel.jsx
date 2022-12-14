import React, { useEffect, useState } from "react";
import Card from "./Card";
import { ReactComponent as Left } from "../assets/left.svg";
import { ReactComponent as Right } from "../assets/right.svg";

const Carousel = ({ data }) => {
  //state
  let [cdata, setCdata] = useState(data);
  let [activeData, setActiveData] = useState([]);
  let [disableRight, setDisableRight] = useState(false);
  let [disableLeft, setDisableLeft] = useState(true);
  //constants
  let tile = 2; //tile to be shown
  let tileMove = 2; //num of tiles to move
  let totLen = cdata.length;
  //didmount
  useEffect(() => {
    let temp = cdata.filter((d) => d.isActive === true);
    setActiveData(temp);
  }, []);

  const updateData = (
    tempActiveData,
    tempCData,
    status = false,
    curFirstIndex,
    curLastIndex
  ) => {
    tempActiveData = tempActiveData.map((item) => {
      item.isActive = status;
      return item;
    });
    tempCData = [
      ...tempCData.slice(0, curFirstIndex),
      ...tempActiveData,
      ...tempCData.slice(curLastIndex + 1, totLen),
    ];
    return { tempActiveData, tempCData };
  };
  //Click Handlers
  let prevClick = () => {
    if (disableLeft) return;
    let tempDisableLeft = false;
    let tempActiveData = [...activeData];
    let tempCData = [...cdata];
    let curLastIndex = activeData[tile - 1].name;
    let curFirstIndex = activeData[0].name;
    let nextFirstIndex = curFirstIndex - tileMove;
    if (curLastIndex == "show") {
      let a = tempActiveData.slice().reverse();
      let index = a.findIndex((item) => typeof item.name == "number");
      curLastIndex = a[index].name;
    }
    //set status of all cards in activeData arr to false
    let data = updateData(
      tempActiveData,
      tempCData,
      false,
      curFirstIndex,
      curLastIndex
    );
    tempActiveData = data.tempActiveData;
    tempCData = data.tempCData;

    if (nextFirstIndex <= 0) tempDisableLeft = true;
    curLastIndex = curFirstIndex - 1;
    curFirstIndex = !tempDisableLeft ? nextFirstIndex : 0;
    tempActiveData = [...tempCData.slice(curFirstIndex, curLastIndex + 1)];

    data = updateData(
      tempActiveData,
      tempCData,
      true,
      curFirstIndex,
      curLastIndex
    );
    tempActiveData = data.tempActiveData;
    tempCData = data.tempCData;

    setDisableRight(false);
    setActiveData(tempActiveData);
    setCdata(tempCData);
    setDisableLeft(tempDisableLeft);
  };

  let nextClick = () => {
    if (disableRight) return; //state
    let tempDisableRight = false;
    let tempActiveData = [...activeData];
    let tempCData = [...cdata];
    let curLastIndex = activeData[tile - 1].name;
    let curFirstIndex = activeData[0].name;
    let nextLastIndex = curLastIndex + tileMove;
    //set status of all cards in activeData arr to false
    let data = updateData(
      tempActiveData,
      tempCData,
      false,
      curFirstIndex,
      curLastIndex
    );
    tempActiveData = data.tempActiveData;
    tempCData = data.tempCData;

    if (nextLastIndex >= totLen - 1) tempDisableRight = true;
    curLastIndex = !tempDisableRight ? nextLastIndex : totLen - 1;
    curFirstIndex = curFirstIndex + tileMove;
    tempActiveData = [...tempCData.slice(curFirstIndex, curLastIndex + 1)];

    data = updateData(
      tempActiveData,
      tempCData,
      false,
      curFirstIndex,
      curLastIndex
    );
    tempActiveData = data.tempActiveData;
    tempCData = data.tempCData;

    if (tempActiveData.length < tile) {
      let count = tile - tempActiveData.length;
      for (let i = 0; i < count; i++) {
        tempActiveData.push({ name: "show", isActive: true });
      }
    }
    setDisableLeft(false);
    setActiveData(tempActiveData);
    setCdata(tempCData);
    setDisableRight(tempDisableRight);
  };

  return (
    <div className="carousel my-12 mx-auto px-5">
      <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700">
        Our epic carousel
      </h2>
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={() => prevClick()}
            className="hover:bg-blue-900/75 text-white w-16 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
          >
            <Left className="h-28" />
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={() => nextClick()}
            className="hover:bg-blue-900/75 text-white w-16 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
          >
            <Right className="h-28" />
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div className="carousel-container relative flex justify-around overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 mx-40">
          {activeData && activeData.map(({ name }, i) => <Card name={name} />)}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
