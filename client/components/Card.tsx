import React from "react";
import { HoloMember } from "../interfaces";
import Image from "next/image";
import fallback from "../public/fallback.png";
import Live from "./Live";
import SubscribeButton from "./SubscribeButton";
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
        channel.live ? "" : "filter brightness-75"
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
        <Live isLive={channel.live} />
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
              width={80}
              height={80}
              className=" object-cover"
              src={channel.avatar || fallback}
            />
          </div>
          <SubscribeButton
            subscribers={channel.subscribers}
            onClick={openInNewTab}
            id_channel={channel.id_channel}
          />
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
