import React from 'react'
import Elevator from "elevator.js";
import coete from "../img/Iconos/cohete.png"
import "../Up/Up.css"

export default function Up() {
  return (
    <div className="elevator-container">
      <button id="parriba" className="elevator-button">
        <img src={coete} alt="Coete" />
      </button>
      <script src="http://tholman.com/elevator.js/elevator.js"></script>
      <script>
        {window.onload = function parriba() {
          var elevator = new Elevator({
            element: document.querySelector("#parriba"),
            speed: 9000
          });
        }}
      </script>
    </div>
  );
}
