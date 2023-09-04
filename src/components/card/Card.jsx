import React from 'react'
import { useSelector } from 'react-redux'
import '../card/Card.css'
 
function Card({name, image, weight_min, weight_max, temperament, height_min, height_max}) {
  const alldogsDetails = useSelector((state => state.dogs))

  return (
    <div className="card">
      <h1 className="nameCard">{name}</h1>
      <div className="image-container">
        <img className="imagenCard" src={image} alt="Image not found" />
      </div>
      <br />
      <h6>Weight MIN: {weight_min} KG</h6>
      <h6>Weight MAX: {weight_max} KG</h6>
      <h6>Height MIN: {height_min} CM</h6>
      <h6>Height MAX: {height_max} CM</h6>
      <h6>TEMPERAMENTS: {temperament ? temperament : alldogsDetails[0].temperaments?.map(e => ` ${e.name} , `)}</h6>
    </div>
  );
}
 
export default Card