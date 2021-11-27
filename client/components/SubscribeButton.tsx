import React from "react";

interface ISubscribeButton {
  subscribers: string;
  onClick: Function;
  id_channel: string;
}

const SubscribeButton = ({
  subscribers,
  id_channel,
  onClick,
}: ISubscribeButton) => {
  return (
    <button
      className="block bg-yt-red py-1 rounded mt-12 w-14 mx-auto text-center text-sm text-white font-medium"
      onClick={() =>
        onClick(
          `https://www.youtube.com/channel/${id_channel}?sub_confirmation=1`
        )
      }
    >
      {subscribers}
    </button>
  );
};

export default SubscribeButton;
