import React from "react";
import Carousel from "./components/Carousel";

const App = () => {
  const data = [
    { name: 0, isActive: true },
    { name: 1, isActive: true },
    { name: 2, isActive: false },
    { name: 3, isActive: false },
    { name: 4, isActive: false },
  ];
  return (
    <div className="py-10 bg-slate-200">
      <Carousel data={data} />
    </div>
  );
};

export default App;
