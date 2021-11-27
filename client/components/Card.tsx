import React from "react";
import { HoloMember } from "../interfaces";
import Image from "next/image";
import fallback from "../public/fallback.png";
interface ICard {
  channel: HoloMember;
}

const Card = ({ channel }: ICard) => {
  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div
      className={` ${
        channel.live ? "filter brightness-75" : ""
      } flex flex-col h-60 shadow-lg rounded-md min-w-80 overflow-hidden border bg-gray-100 border-gray-300 transition-transform transform scale-100 sm:hover:scale-110`}
    >
      <div className="relative h-20 border-b border-gray-200">
        <Image
          className="filter brightness-90"
          alt="thumbnail"
          src={channel.thumbnail || fallback}
          layout="fill"
          objectFit="cover"
        />
        <div className="filter brightness-50 grayscale absolute right-3 top-3 flex items-center bg-yt-red px-2 py-1 justify-evenly gap-1 font-bold rounded-md">
          <div className="relative inline-flex rounded-full h-2 w-2 bg-white top-px">
            {channel.live && (
              <span className="animate-ping inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            )}
          </div>
          <span className="text-white">Live</span>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="relative w-1/3 text-center">
          <div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 rounded-full overflow-hidden w-20 h-20 border-2 border-primary filter drop-shadow-xl brightness-95 cursor-pointer"
            onClick={() =>
              openInNewTab(
                `https://www.youtube.com/channel/${channel.id_channel}`
              )
            }
          >
            <Image
              alt="profile"
              src={channel.avatar || fallback}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <button
            className=" block bg-yt-red py-1 rounded mt-12 w-14 mx-auto text-center text-sm text-white font-medium"
            onClick={() =>
              openInNewTab(
                `https://www.youtube.com/channel/${channel.id_channel}?sub_confirmation=1`
              )
            }
          >
            {channel.subscribers}
          </button>
          <span className="text-xs px-2 font-medium">
            {channel.channel_name}
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center p-2 text-center">
          <div
            className="relative w-4/5 h-4/5 cursor-pointer"
            onClick={() =>
              channel.live &&
              channel.live_video_url &&
              openInNewTab(channel.live_video_url)
            }
          >
            <Image
              alt="profile"
              src={channel.live_video_thumbnail || fallback}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <span className="text-2xs mt-2 overflow-ellipsis overflow-hidden">
            {channel.live_video_title ||
              `${channel.channel_name} is not streaming`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
