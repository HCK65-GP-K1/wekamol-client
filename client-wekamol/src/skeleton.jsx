import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="place-items-center flex flex-col justify-center w-full h-screen bg-black">
      <h1 className="text-center text-5xl text-slate-200 mb-10">Waiting for opponent...</h1>
      <span className="loading loading-spinner text-success w-32 h-32"></span>
    </div>
  );
};

export default LoadingAnimation;
