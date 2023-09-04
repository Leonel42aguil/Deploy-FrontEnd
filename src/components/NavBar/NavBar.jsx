import React from "react";
import { useState } from "react";
import contact from "../img/navBar/contact-us.png";
// import contact from "../img/navBar/contacto.png";
import link from "../img/navBar/linkedin.png";
import twitter from "../img/navBar/twitter.png";
import gitHub from "../img/navBar/gitHub.png";
import "../NavBar/NavBar.css";

export default function NavBar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="navbar">
      <div className="menu-container"> 
        <ul className={`menu-list ${menuVisible ? "visible" : ""}`}>
            <a href="https://www.linkedin.com/in/leonelchatard/"> 
              <img src={link} alt="link" />
            </a>
            <a href="https://twitter.com/i/flow/login?input_flow_data=%7Brequested_variant%3AeyJsYW5nIjoiZXMifQ%3D%3D%7D">
            <img src={twitter} alt="twitter" />
            </a>
            <a href="https://github.com/Leonel42aguil">
            <img src={gitHub} alt="gitHub" />
            </a>
        </ul>
      </div>
      <img
        onClick={toggleMenu}
        src={contact}
        alt="menu"
        className={`round-image ${menuVisible ? "active" : ""}`}
        title="Info aquí"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}