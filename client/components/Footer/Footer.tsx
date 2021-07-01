import github from "../../public/github.png";
import email from "../../public/email.png";
import Image from "next/image";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer>
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
              src={github}
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
              src={email}
              alt="RafadanaM@gmail.com"
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
