import React from "react";
import { HoloMember, MembersResponse } from "../interfaces";
import FilterButton from "./FilterButton";

interface IFilterButtons {
  members: MembersResponse;
  clickHandler: Function;
}

const FilterButtons = ({ members, clickHandler }: IFilterButtons) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <FilterButton
        title="Currently Live"
        onClick={() => clickHandler("Live")}
      />
      <FilterButton title="All" onClick={() => clickHandler("All")} />
      {Object.keys(members).map((gen) => (
        <FilterButton key={gen} title={gen} onClick={() => clickHandler(gen)} />
      ))}
    </div>
  );
};

export default FilterButtons;
