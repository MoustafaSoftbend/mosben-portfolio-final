import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSquarePhone } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="">
      <div className="nav-container flex flex-row justify-between container">
        <div className="logo-container">
          <Link className="logo" href="/">
            MB
          </Link>
        </div>
        <div className="nav-navigation flex flex-row">
          <Link className="btn hamburger" href="/">
            <FontAwesomeIcon
              className="fa-icon block icon clr-primary"
              size="lg"
              icon={faBars}
            />
          </Link>

          <ul className="nav-list flex">
            <li className="nav-item">
              <Link className="" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#services-section" className="">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#projects-section" className="">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#contact-section" className="">
                Contact
              </Link>
            </li>
          </ul>
          <div className="nav-buttons flex flex-row gap-[1em] p-3">
            <Link href="#contact-section">
              <FontAwesomeIcon
                className="icon-lg clr-secondary"
                icon={faSquarePhone}
              />
            </Link>
            <Link className="btn btn-primary btn-round " href="#projects-section">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
