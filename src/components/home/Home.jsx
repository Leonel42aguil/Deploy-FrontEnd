import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, ordenByAplhabetical } from "../../actions";
import Card from "../card/Card";
import Paginado from "../paginado/Paginado";
import "./Home.css";
import Swal from "sweetalert2";
import ButtonCreate from "../ButtonCreate/ButtonCreate";
import FiltrosHome from "../FiltrosHome/FiltrosHome";
import Up from "../Up/Up";
import SearchBar from "../searchBar/SearchBar";
import flecha from "../img/Iconos/flecha.png";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temp = useSelector((state) => state.temperaments);
  const [order, setOrden] = useState("");
  const [temperamentSelected, setTemperamentSelected] = useState("any");
  // const [selectCreator, setSelectCreator] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(16);

  const filteredDogs = allDogs.filter((dog) => {
    if (temperamentSelected === "any") {
      return true;
    }

    const dogsTemperaments = dog.temperament?.split(", ");
    return dogsTemperaments?.includes(temperamentSelected);
  });

  const indexOfLastDogs = currentPage * dogsPerPage; //12
  const indexOfFirstDogs = indexOfLastDogs - dogsPerPage; //0
  const currentDogs = allDogs.slice(indexOfFirstDogs, indexOfLastDogs); //Agarra el arreglo, toma una porcion dependienlo lo que le pase por parametro -> Agarra solamente el indice del 1 y del ultimo personaje (1 a 12)

  const paginado = (pageNumber) => {
    //Aca nos ayuda al renderizado
    setCurrentPage(pageNumber); //Seteamos la pagina en ese numero
  };

  useEffect(() => {
    dispatch(getDogs());
  }, []);

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  function handleFilter(e) {
    //✅
    const temperamentSelected = e.target.value;
    setTemperamentSelected(temperamentSelected);
    setCurrentPage(1);
  }

  function handleAlphabeticalSort(e) {
    //✅
    e.preventDefault();
    dispatch(ordenByAplhabetical(e.target.value));
    setCurrentPage(1);
    setOrden(`Order ${e.target.value}`);
  }

  const handleCreateClick = () => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to create a new dog breed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/create";
      }
    });
  };

  const [showFilters, setShowFilters] = useState(false);
  const buttonText = showFilters ? 'Hide' : 'Filter by'; 

  function toggleFilters() {
    setShowFilters(!showFilters);
  }

  const resetCurrentPage = () => {
    setCurrentPage(1);
  };

  return (
    <div>
      <div>
        <ButtonCreate />
      
        <SearchBar setCurrentPage={resetCurrentPage} />

        <FiltrosHome />

        <button className="mostrarButtonHome" onClick={toggleFilters}>
        {showFilters ? "Hide" : "Filter by"}
        </button>

        {showFilters && (
          <div className="filtrosHome">
            <select
              className="headerFilteredHome"
              onChange={(e) => handleAlphabeticalSort(e)}
            >
              <option selected disabled>
                Select one
              </option>
              <option className="filterOneHome" value="a">
                A-Z
              </option>
              <option className="filterOneHome" value="z">
                Z-A
              </option>
            </select>

            {/*SELECT temperaments*/}

            <select className="headerFilteredHome" onChange={handleFilter}>
              <option selected disabled>
                Select one
              </option>
              {temp &&
                temp.map((t, i) => {
                  return (
                    <option className="filterOneHome" value={t.name} key={i}>
                      {t.name}
                    </option>
                  );
                })}
            </select>
          </div>
        )}

        <div className="card-container">
          {filteredDogs?.slice(indexOfFirstDogs, indexOfLastDogs).map((e) => {
            return (
              <div className="card-wrapper">
                <Card
                  name={<Link to={"/dog/" + e.id}>{e.name}</Link>}
                  image={e.image}
                  weight_min={e.weight_min}
                  weight_max={e.weight_max}
                  temperament={e.temperament}
                  height_min={e.height_min}
                  height_max={e.height_max}
                  key={e.id}
                />
              </div>
            );
          })}
        </div>

        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={filteredDogs.length} //porque necesitamos un valor numerico
          paginado={paginado}
        />

        <Up />
      </div>
    </div>
  );
}
