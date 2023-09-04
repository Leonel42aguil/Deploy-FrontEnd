import React from "react";
import wsp from "../img/WSPPP.svg";
// import './BotonWsp.css';

export default function BotonWsp() {
  return (
    <div className="boton-wsp">
      <a
        href="https://wa.me/542615591495?text=hola bRODHERRRRRRRS"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={wsp} alt="WhatsApp" className="wsp-icon" />
        <span className="wsp-text">Enviar mensaje</span>
      </a>
    </div>
  ); 
}
