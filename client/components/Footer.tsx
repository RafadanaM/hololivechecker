import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-primary text-center text-white">
      <ul>
        <li>
          <a
            href="https://github.com/RafadanaM/hololivechecker"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={32}
              width={32}
              src="/github.png"
              alt="github.com/RafadanaM/hololivechecker"
            />
          </a>
        </li>

        <li>
          <a
            href="mailto:RafadanaM@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={32}
              width={32}
              src="/email.png"
              alt="RafadanaM@gmail.com"
            />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
