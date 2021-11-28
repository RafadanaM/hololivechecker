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
    <div className="flex gap-2 flex-wrap">
      <FilterButton
        title="Currently Live"
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
    </div>
  );
};

export default FilterButtons;
