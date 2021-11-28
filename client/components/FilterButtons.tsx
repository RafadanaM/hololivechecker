import React from "react";
import { HoloMember, MembersResponse } from "../interfaces";
import FilterButton from "./FilterButton";

interface IFilterButtons {
  members: MembersResponse;
  clickHandler: Function;
  currentFilter: string;
}

const FilterButtons = ({
  members,
  clickHandler,
  currentFilter,
}: IFilterButtons) => {
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
      {Object.keys(members).map((gen) => (
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
