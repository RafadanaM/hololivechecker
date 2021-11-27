import React from "react";

interface ILive {
  isLive: Boolean;
}

const Live = ({ isLive }: ILive) => {
  return (
    <div className="absolute right-3 top-3 flex items-center bg-yt-red px-2 py-1 justify-evenly gap-1 font-bold rounded-md">
      <div className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white top-px">
        {isLive && (
          <span className="animate-ping inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        )}
      </div>
      <span className="text-white">Live</span>
    </div>
  );
};

export default Live;
