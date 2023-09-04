import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getDogs,
  filterCreated,
  orderByName,
  getTemperaments,
  filterHeight,
  orderByWeight,
  ordenByAplhabetical,
} from "../../actions";
import "../FiltrosHome/FiltrosHome.css"

export default function FiltrosHome() {
  const [order, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectCreator, setSelectCreator] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();
  const buttonText = showFilters ? 'Hide' : 'Filter by'; 

  function handleHeight(e) {
    e.preventDefault();
    setCurrentPage(1);
    console.log(e.target.value);
    dispatch(filterHeight(e.target.value));
    setOrden(`Order ${e.target.value}`);
  }

  function handleSort(e) {
    e.preventDefault(); 
    const value = e.target.value;
    dispatch(orderByName(value));
    if (value === "peso_asc" || value === "peso_des") {
      dispatch(orderByWeight(value));
    }
    setCurrentPage(1);
    setOrden(`Ordenado ${value}`);
  }

  function handleFilterCreate(e) {
    e.preventDefault();
    setOrden(e.target.value);
    setCurrentPage(1);
    console.log(e.target.value);
    dispatch(filterCreated(e.target.value));
  }

  function toggleFilters() {
    setShowFilters(!showFilters);
  }

  return (
    <div>
      <button className="mostrarButton" onClick={toggleFilters}>{showFilters ? "Hide" : "Filter by"}</button>

      {showFilters && (
        <div className="filtros">
          {/* SELECT altura */}
          <select className="headerFiltered" onChange={(e) => handleHeight(e)}>
            <option selected disabled>
              Select one
            </option>
            <option className="filterOne" value="height_max">Height (min)</option>
            <option className="filterOne" value="height_min">Height (MAX)</option>
          </select>

          {/* SELECT peso */}
          <select className="headerFiltered" onChange={(e) => handleSort(e)}>
            <option selected disabled>
              Select one
            </option>
            <option className="filterOne" value="peso_des">
              Weight (MAX)
            </option>
            <option className="filterOne" value="peso_asc">
              Weight (MIN)
            </option>
          </select>

          {/* SELECT de created, api */}
          <select className="headerFiltered" value={selectCreator} onChange={handleFilterCreate}>
            <option selected disabled>
              Select one
            </option>
            <option className="filterOne" value="all">All</option>
            <option className="filterOne" value="created">Created</option>
          </select>
        </div>
      )}
    </div>
  );
}

