import { useState } from "react";
import FilterButtons from "./FilterButtons";

interface IDropdown {
  clickHandler: Function;
  currentFilter: string;
}
const Dropdown = ({ clickHandler, currentFilter }: IDropdown) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickItem = (gen: string): void => {
    clickHandler(gen);
    setIsOpen(false);
  };
  return (
    <div className="relative text-primary w-28 text-sm ml-auto md:hidden z-40">
      <button
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="flex items-center transition-all duration-500 justify-around border border-primary w-full py-0.5 font-medium"
      >
        {currentFilter}
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-up"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-down transform scale-125"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        )}
      </button>

      <div
        className={`absolute right-0 w-full flex flex-col transform origin-top transition-all ${
          isOpen ? "scale-y-100" : "scale-y-0"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <FilterButtons
          clickHandler={handleClickItem}
          currentFilter={currentFilter}
        />
      </div>
    </div>
  );
};

export default Dropdown;
