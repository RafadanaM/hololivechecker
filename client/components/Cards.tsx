import React from "react";
import { HoloMember } from "../interfaces";
import Card from "./Card";

interface ICards {
  channels: HoloMember[];
  isLive: boolean;
}

const Cards = ({ channels, isLive }: ICards) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 py-3 md:py-5 px-1 md:px-0">
      {channels.length === 0 ? (
        <p className="text-lg font-bold text-center col-span-full">
          {isLive ? "No one is currently streaming!" : "Channel not found!"}
        </p>
      ) : null}
      {channels.map((channel) => (
        <Card key={channel.id} channel={channel} />
      ))}
    </div>
  );
};

export default Cards;
