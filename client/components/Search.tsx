import Image from "next/image";
import SearchLogo from "../public/search.svg";

interface ISearch {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Search = ({ value, onChange, onButtonClick }: ISearch) => {
  return (
    <div className="flex mb-3 md:mb-5 shadow-md">
      <button
        onClick={onButtonClick}
        className="bg-primary w-12 flex items-center justify-center rounded-l-lg hover:bg-opacity-90"
      >
        <Image
          src={SearchLogo}
          alt="Search"
          className="select-none"
          draggable={false}
        />
      </button>

      <input
        value={value}
        onChange={onChange}
        className="w-full p-2 text-lg border border-primary rounded-r-lg outline-none"
      />
    </div>
  );
};

export default Search;
