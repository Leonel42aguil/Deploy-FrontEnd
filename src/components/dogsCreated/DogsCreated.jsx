import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTemperaments,
  postDogs,
  addSelectedTemperament,
} from "../../actions/index";
import "./DogsCreated.css";
import heart from "..//img/heart.svg";
import Swal from "sweetalert2";
import flecha from "../img/Iconos/flecha.png";
import x from "../img/Iconos/borrar.png";
import swal from "sweetalert2";

function validate(input) {
  let errors = {};

  //  --- NAME --
  if (!input.name) {
    errors.name = "debes ponerle un nombre";
  } else if (!/[A-Z]+$/i.test(input.name)) {
    //Expresion regular
    errors.name = "solo puede contener letras";
  } else if (parseInt(input.name.length) >= 25) {
    //parseInt:Convierte una cadela en un numero entero
    errors.name = "must contain less than 25 characters";
  }

  //  --HEIGHT--
  if (!input.height_max) {
    errors.height_max = "max height required";
  } else if (parseInt(input.height_max) > 85) {
    errors.height_max = "must be less than 85CM";
  } else if (!/^[0-9]+$/.test(input.height_max)) {
    errors.height_max = "can only contain numbers";
  }

  if (!input.height_min) {
    errors.height_min = "min height required";
  } else if (parseInt(input.height_min) >= parseInt(input.height_max)) {
    errors.height_min = "must be less than max";
  } else if (!/^[0-9]+$/.test(input.height_min)) {
    errors.height_min = "can only contain numbers";
  }

  //  --WEIGHT--
  if (!input.weight_max) {
    errors.weight_max = "max weight required";
  } else if (parseInt(input.weight_max) > 90) {
    errors.weight_max = "must be less than 90KG";
  } else if (!/^[0-9]+$/.test(input.weight_max)) {
    errors.weight_max = "can only contain numbers";
  }

  if (!input.weight_min) {
    errors.weight_min = "min weight required";
  } else if (parseInt(input.weight_min) >= parseInt(input.weight_max)) {
    errors.weight_min = "must be less than max";
  }

  //  --LIFE_SPAN--
  if (parseInt(input.life_span_max) > 20) {
    errors.life_span_max = "must be less than 20 years old";
  } else if (!/^[0-9]+$/.test(input.life_span_max)) {
    errors.life_span_max = "can only contain numbers";
  }

  if (parseInt(input.life_span_min) >= parseInt(input.life_span_max)) {
    errors.life_span_min = "must be less than max";
  } else if (!/^[0-9]+$/.test(input.life_span_min)) {
    errors.life_span_min = "can only contain numbers";
  }

  return errors;
}

export default function DogsCreated() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperamentos = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [input, setInput] = useState({
    image: "",
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    temperament: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    const selectedId = e.target.value;
    if (input.temperament.includes(selectedId)) {
      swal.fire({
        title: "Error",
        text: "Seleccionaste el mismo temperamento dos veces",
        icon: "error",
      });
    } else {
      setInput({
        ...input,
        temperament: [...input.temperament, selectedId],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to create the dog?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postDogs(input));
        history.push("/home");
        setInput({
          image: "",
          name: "",
          height_min: "",
          height_max: "",
          weight_min: "",
          weight_max: "",
          life_span_min: "",
          life_span_max: "",
          temperament: [],
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Dog creation was cancelled", "error");
      }
    });
  }

  function handleDelete(el) {
    swal
      .fire({
        title: "¿Borrar?",
        text: "¿Estás seguro de que deseas borrar?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Sí",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          setInput({
            ...input,
            temperament: input.temperament.filter((t) => t !== el),
          });
          swal.fire(
            "¡Borrado!",
            "El elemento ha sido borrado exitosamente."
            // "success"
          );
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire("Cancelado", "El borrado ha sido cancelado.", "error");
        }
      });
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const handleReturnClick = () => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to go back?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        window.history.back();
      }
    });
  };

  return (
    <div className="container">
      <div className="header">
        <button className="return-btn" onClick={handleReturnClick}>
          <img className="imgFlecha" src={flecha} alt="flecha" />
        </button>
      </div>
      <h1 className="title">ADD DATA ABOUT YOUR RACE</h1>
      <p>
        Data with <span>*</span> required
      </p>

      {/*---- INPUT NAME ---- */}
      <form className="form" action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Name:</label>
          <div>
            <input
              className="input"
              placeholder="Ej: dogo"
              onChange={handleChange}
              name="name"
              value={input.name}
              required
            />
          </div>
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* ---- INPUT IMAGE ---- */}
        <div className="form-group">
          <label className="label">Image</label>
          <div>
            <input
              className="input"
              placeholder="Image URL"
              onChange={handleChange}
              name="image"
              value={input.image}
              required
            />
          </div>
        </div>

        {/* ---- INPUT HEIGHT ---- */}
        <div className="form-group">
          <div>
            <label className="label">Height:</label>
            <div className="input-group">
              <input
                className="input"
                placeholder="Max"
                onChange={handleChange}
                name="height_max"
                value={input.height_max}
                required
              />
              <span className="unit">CM</span>
            </div>
            {errors.height_max && (
              <span className="error">{errors.height_max}</span>
            )}
          </div>

          <div>
            <label className="label">Height:</label>
            <div className="input-group">
              <input
                className="input"
                placeholder="Min"
                onChange={handleChange}
                name="height_min"
                value={input.height_min}
                required
              />
              <span className="unit">CM</span>
            </div>
            {errors.height_min && (
              <span className="error">{errors.height_min}</span>
            )}
          </div>
        </div>

        {/* ---- INPUT WEIGHT ---- */}
        <div className="form-group">
          <div>
            <label className="label">Weight:</label>
            <div className="input-group">
              <input
                className="input"
                placeholder="Max"
                onChange={handleChange}
                name="weight_max"
                value={input.weight_max}
                required
              />
              <span className="unit">KG</span>
            </div>
            {errors.weight_max && (
              <span className="error">{errors.weight_max}</span>
            )}
          </div>

          <div>
            <label className="label">Weight:</label>
            <div className="input-group">
              <input
                className="input"
                placeholder="Min"
                onChange={handleChange}
                name="weight_min"
                value={input.weight_min}
                required
              />
              <span className="unit">KG</span>
            </div>
            {errors.weight_min && (
              <span className="error">{errors.weight_min}</span>
            )}
          </div>
        </div>

        {/* ---- INPUT LIFE_SPAN ---- */}
        <div className="form-group">
          <div>
            <label className="label">Years of life:</label>
            <div className="input-group">
              <input
                className="input"
                placeholder="Max"
                onChange={handleChange}
                name="life_span_max"
                value={input.life_span_max}
                required
              />
              <span className="unit">Year</span>
            </div>
            {errors.life_span_max && (
              <span className="error">{errors.life_span_max}</span>
            )}
          </div>

          <div>
            <div className="input-group">
              <input
                className="input"
                placeholder="Min"
                onChange={handleChange}
                name="life_span_min"
                value={input.life_span_min}
                required
              />
              <span className="unit">Year</span>
            </div>
            {errors.life_span_min && (
              <span className="error">{errors.life_span_min}</span>
            )}
          </div>
        </div>

        {/*  --Temperamentos--  */}
        <div className="form-group">
          <label className="label">Temperaments:</label>
          <div>
            <select
              className="select"
              name="temperamentos"
              onChange={handleSelect}
              required
            >
              <option selected disabled>
                Select one
              </option>
              {temperamentos.map((t, i) => {
                return (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                );
              })}
            </select>
            {input.temperament.map((el, index) => (
              <div key={index} className="selected-temperament">
                <p className="tempSelectCreate">.{el}</p>
                <div>
                  <h1 className="delete-btn" onClick={() => handleDelete(el)}>
                    <img className="x" src={x} alt="x" />
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="submit-btn" type="submit">
          Create
        </button>
      </form>
      <div>
        <footer className="footer">
          <span>INDIVIDUAL BOOTCAMP PROJECT</span>
          <img src={heart} alt="heart" />
        </footer>
      </div>
    </div>
  );
}
