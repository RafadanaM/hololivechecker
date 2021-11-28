import React from "react";

const Navbar = () => {
  return (
    <header className="flex items-center justify-center  bg-primary font-bold text-white rounded-b-md md:rounded-none h-14 md:h-20 text-xl md:text-3xl">
      <a
        className="cursor-pointer"
        href=""
        onClick={() => window.location.reload()}
      >
        Hololive Stream Checker
      </a>
    </header>
  );
};

export default Navbar;
