import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <ul className={classes.ulContainer}>
        <li>
          <a
            href="https://github.com/RafadanaM"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made By: RafadanaM
          </a>
        </li>
        <li>
          <a
            href="mailto:RafadanaM@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email me!
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
