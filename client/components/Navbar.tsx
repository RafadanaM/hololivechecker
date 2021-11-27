import React from "react";

const Navbar = () => {
  return (
    <header className="flex items-center justify-center sticky top-0 z-40 bg-primary font-bold text-white h-20 text-3xl">
      <h1 className="cursor-pointer" onClick={() => window.location.reload()}>
        Hololive Stream Checker
      </h1>
    </header>
  );
};

export default Navbar;
