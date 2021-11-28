import React from "react";
import { HoloMember, MembersResponse } from "../interfaces";
import Card from "./Card";

interface ICards {
  channels: HoloMember[];
}

const Cards = ({ channels }: ICards) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 py-10 px-1 md:px-0">
      {channels.map((channel) => (
        <Card key={channel.id} channel={channel} />
      ))}
    </div>
  );
};

export default Cards;