import React, { MouseEventHandler } from "react";

interface IFIlterButton {
  title: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const FilterButton = ({ title, onClick, isActive }: IFIlterButton) => {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 md:rounded font-medium transition-color duration-300 text-xs md:text-base ${
        isActive
          ? "bg-primary text-white"
          : "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
      }`}
    >
      {title}
    </button>
  );
};

export default FilterButton;
