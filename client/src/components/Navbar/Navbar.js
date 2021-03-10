import React from "react";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarContainer}>
        <ul
          className={classes.navLinks}
          onClick={() => window.location.reload()}
        >
          <li> Hololive Live Checker</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
