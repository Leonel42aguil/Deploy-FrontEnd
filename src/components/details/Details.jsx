import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetail } from "../../actions/index"
import { useEffect } from "react"
import './Details.css'
import Swal from 'sweetalert2';
import { useState } from "react"

export default function Details(props) {
  const [imageSize, setImageSize] = useState(200);
  const dispatch = useDispatch();
  const myDogs = useSelector(state => state.details);
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const handleReturn = () => {
    Swal.fire({
      title: 'Seguro que quieres volver?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        props.history.push('/home');
      }
    });
  };

  const handleImageClick = () => {
    setImageSize(prevSize => (prevSize === 200 ? 320 : 400));
  };

  return (
    <div className="details-container">
      {myDogs?.length > 0 && !!myDogs ? (
        <div className="details">
          <h1 className="details-heading">ID: {myDogs[0].id}</h1>
          <img
            className="details-image"
            src={myDogs[0].image}
            alt="imag not fout"
            style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
            onClick={handleImageClick}
          />
          <h1 className="details-heading">{myDogs[0].name}</h1>
          <h2 className="details-subheading">Height min: {myDogs[0].height_min}CM</h2>
          <h2 className="details-subheading">Height max: {myDogs[0].height_max}CM</h2>
          <h2 className="details-subheading">Weight min: {myDogs[0].weight_min}KG</h2>
          <h2 className="details-subheading">Weight max: {myDogs[0].weight_max}KG</h2>
          <h2 className="details-subheading">Life min: {myDogs[0].life_span_min} YEAR</h2>
          <h2 className="details-subheading">Life max: {myDogs[0].life_span_max} YEAR</h2>
          <p className="details-temperaments">
            TEMPERAMENTS:{' '}
            {myDogs && myDogs[0].temperament
              ? myDogs[0].temperament
              : myDogs[0].temperaments.map(e => `${e.name} ,`)}
          </p>
          {console.log(myDogs[0])}
        </div>
      ) : (
        <p className="loading">⏱ </p>
      )}
      <button className="details-button" onClick={handleReturn}>
        Return
      </button>
    </div>
  );
}
