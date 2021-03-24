import React from "react";
import classes from "./Footer.module.css";
import github from "../../images/github.png";
import email from "../../images/email.png";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <ul className={classes.ulContainer}>
        <li>
          <a
            href="https://github.com/RafadanaM/hololivechecker"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="github" />
          </a>
        </li>
        <li>
          <a
            href="mailto:RafadanaM@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={email} alt="email" />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
