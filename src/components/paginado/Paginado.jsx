import React from "react";
import "./Paginado.css";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = []; //Arreglo de numero que da con el resultado de Linea 11

  //ceil:Redondea todos los personajes / sobre la cantidad de personajes que quiero por pagina
  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav className="pagination">
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers?.map(
            (
              number //Agarra cada uno y lo renderiza por separado
            ) => (
              <li className="number" key={number}>
                <a
                  className={`numberPaginado ${
                    paginado === number ? "active" : ""
                  }`}
                  onClick={() => paginado(number)}
                >
                  {number}
                </a>
                {/*Cuando haga click le pasa el numero del paginas*/}
              </li>
            )
          )}
      </ul>
    </nav>
  );
}
