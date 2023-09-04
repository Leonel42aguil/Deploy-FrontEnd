import React from "react";
import { Link } from "react-router-dom";
import "../landingPage/LandingPage.css";

import icon1 from "../img/icons/dog.png";
import icon2 from "../img/icons/passport.png";
import icon3 from "../img/icons/photo-shoot.png";
import icon4 from "../img/icons/earth.png";
import icon5 from "../img/icons/bagpack.png";
import Swal from "sweetalert2";

import hero_desktop from "../img/icons/hero-desktop.png";
import hero_desktop_responsive from "../img/icons/hero-desktop-responsive.png";
import hero_mobile from "../img/icons/hero-mobile.png";

export default function LandingPage() {
  const handleInicioClick = () => {
    Swal.fire({
      title: "Welcome to apiDog",
      text: "Enjoy the best app about dogs!",
      // icon: 'success',
      confirmButtonText: "Accept",
    });
  };
  return (
    <div className="landingPage">
      <main>
        <div className="main_left">
          <h1 className="titulo">
            My <span className="titulo_perro">dogs</span> are not my pet, they
            are my family.
          </h1>
          <p className="sub_titulo">
            Your best friend knows you better than anyone, do you know him? find
            out with the best app about our favorite furry ones.
          </p>
          <button className="acceder_grande" onClick={handleInicioClick}>
            <Link to="/home" className="acceder_grandee" >
                 Start
            </Link>
          </button>
        </div>

        <div className="main_right">
          <div className="div_hero">
            <img className="hero" src={hero_desktop} alt="hero" />
            <img
              className="hero_responsive"
              src={hero_desktop_responsive}
              alt="hero"
            />
            <img className="hero_mobile" src={hero_mobile} alt="hero" />
          </div>
        </div>
      </main> 

      <div className="div_functions">
        <div className="funciones">
          <img className="icon" src={icon1} alt="icon" />
          <p className="funcion_desc">find your favorite dog</p>
        </div>

        <div className="funciones">
          <img className="icon" src={icon2} alt="icon" />
          <p className="funcion_desc">Filter by breed or temperament</p>
        </div>

        <div className="funciones">
          <img className="icon" src={icon3} alt="icon" />
          <p className="funcion_desc">Add a new friend</p>
        </div>

        <div className="funciones">
          <img className="icon" src={icon4} alt="icon" />
          <p className="funcion_desc">
            races of <br /> everyone
          </p>
        </div>

        <div className="funciones">
          <img className="icon" src={icon5} alt="icon" />
          <p className="funcion_desc">
            take them <br /> always with you
          </p>
        </div>
      </div>
    </div>
  );
}
