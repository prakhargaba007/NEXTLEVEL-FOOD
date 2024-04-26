import NavLink from "./nav-link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "./nav-bar.css";

export default function NavBar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <div>
      <nav className="nav" ref={navRef}>
        <ul>
          <li onClick={showNavbar}>
            <NavLink href="/meals">Browse Meals</NavLink>
          </li>
          <li onClick={showNavbar}>
            <NavLink href="/community">Foodies Community</NavLink>
          </li>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </ul>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </div>
  );
}
