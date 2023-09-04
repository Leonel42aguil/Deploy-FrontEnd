import React from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { getDogs } from "../../actions";
import "../ButtonCreate/ButtonCreate.css"
import flecha from "../img/Iconos/flecha.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ButtonCreate({setCurrentPage}) {
  const dispatch = useDispatch();
  const history = useHistory()

  const handleCreateClick = () => {
        window.location.href = "/create";
  };

  function handleClick(e) {
    //✅
    e.preventDefault();
    Swal.fire({
      title: "¿You sure want to recharge the dogs?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(getDogs());
      }
    });
  }

  const handleReturnClick = () => {
    history.push("/");
  };

  return (
    <div>
     <button className="return-btn"  onClick={handleReturnClick}>
          <img className="imgFlecha" src={flecha} alt="flecha" />
        </button> 
      <div className="container-button">
        <button  className="create-button" onClick={handleCreateClick}>
          Create dog breed
        </button>
      </div> 
      <div> 
      </div>

      <div className="container-button">
        <button
        className="secondary-button"
        onClick={(e) => {
          handleClick(e);
          }}
          >
          Reload the dogs
        </button>
      </div>
    </div>
  );
}
