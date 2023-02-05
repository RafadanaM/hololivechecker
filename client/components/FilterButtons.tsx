import React from "react";
import FilterButton from "./FilterButton";
import { filters } from "../data/data";

interface IFilterButtons {
  clickHandler: Function;
  currentFilter: string;
}

const FilterButtons = ({ clickHandler, currentFilter }: IFilterButtons) => {
  return (
    <>
      <FilterButton
        title="Live"
        isActive={currentFilter === "Live"}
        onClick={() => clickHandler("Live")}
      />
      <FilterButton
        title="All"
        isActive={currentFilter === "All"}
        onClick={() => clickHandler("All")}
      />
      {filters.map((gen) => (
        <FilterButton
          key={gen}
          isActive={currentFilter === gen}
          title={gen}
          onClick={() => clickHandler(gen)}
        />
      ))}
    </>
  );
};

export default FilterButtons;
