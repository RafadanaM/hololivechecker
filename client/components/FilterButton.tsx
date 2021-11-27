import React, { MouseEventHandler } from "react";

interface IFIlterButton {
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const FilterButton = ({ title, onClick }: IFIlterButton) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-white px-2.5 py-1 rounded font-medium transition-all duration-300 bg-opacity-100 hover:bg-opacity-75"
    >
      {title}
    </button>
  );
};

export default FilterButton;
