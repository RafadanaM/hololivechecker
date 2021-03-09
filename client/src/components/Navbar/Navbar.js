import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarContainer}>
        <Link to="/" className={classes.navLinks}>
          Hololive Live Checker
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
