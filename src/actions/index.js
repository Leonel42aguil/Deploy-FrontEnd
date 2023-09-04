import Swal from 'sweetalert2';
import axios from "axios"

//✅
// BUSQUEDA POR RAZA
export function getRaza(name) {
  return async function(dispatch) {
    try {
      let json = (await axios(`http://localhost:3001/dogs?name=${name}`)).data;
      // let json = (await axios(`/dogs?name=${name}`)).data;

      if (json.length > 1) {
        Swal.fire({
          title: 'More than one race has been found',
          icon: 'info',
          confirmButtonText: 'Close'
        });
      } else {
        Swal.fire({
          title: 'Found breed',
          icon: 'success',
          confirmButtonText: 'Close'
        });
      }

      return dispatch({
        type: 'GET_NAME_RAZA',
        payload: json
      });
    } catch (error) {
      Swal.fire({
        title: 'dog breed not found',
        icon: 'error',
        confirmButtonText: 'Close'
      });
      console.log(error);
    }
  };
}
 

//✅
//NOS TRAE TODOS LOS DOGS

export function getDogs(){
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/dogs')
        // var json = await axios.get('/dogs')
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        }) 
    }
} 

//✅
// ORDER POR PESO

export const orderByWeight = (payload) => {
  return {
    type: "ORDER_BY_WEIGHT",
    payload
  }
}

//✅
// FILTRA POR ORDEN A-Z - Z-A

export function ordenByAplhabetical(payload) {
  return {
    type: 'ALPHABETICAL_SORT',
    payload
  }
}; 

//✅
// NOS TRAE TODOS LOS TEMPERAMENTOS  

export function getTemperaments() {
  return async function(dispatch){
    var info = await axios('http://localhost:3001/temperaments') 
    // var info = await axios('/temperaments') 
    return dispatch({type: 'GET_TEMPERAMENTS', payload: info.data})
  }
} 

export function addSelectedTemperament(id) {
  return {
    type: 'ADD_SELECTED_TEMPERAMENT',
    payload: id
  }
}


//✅
// FILTRO DE CREATED, API , EXISTENTE

export function filterCreated(payload){
 return {
   type: 'FILTER_CREATED', 
   payload
 }
}

//✅
// FORMULARIO DE CREACION

export function postDogs (payload){
  return async function(dispatch){
    try {
       const response = await axios.post('http://localhost:3001/dogs', payload)
      //  const response = await axios.post('/dogs', payload)
      //  alert("Gracias por proporcionar toda la información necesaria sobre raza creada!✅")
       alert("Thank you for providing all the necessary information about breed created!✅")
       return dispatch({
         type: 'DOG_POST'
       })
     } catch (error) {
       console.log(error)
      // alert("🚫Necesitamos más información en el formulario, para crear de manera efectiva🚫")
     }
   } 
 }

//✅
// ASC O DESC

export function orderByName(payload) {
  return{
    type: 'ORDER_BY_NAME',
    payload
  }
}

//✅
// DETAIL POR ID     
export const getDetail = (id) => {
  return async function(dispatch) {
    try {
      // let details = (await axios(`/dogs/${id}`)).data;

      let details = (await axios(`http://localhost:3001/dogs/${id}`)).data;
      // let details = await axios.get('http://localhost:3001/dogs' + id)
      return dispatch({
        type: 'GET_DETAILS',
        payload: details
      })
    } catch (error) { 
        console.log(error)
      }
    } 
  }
  
 //✅
 //FILTER POR HEIGHT
  export const filterHeight = (payload) => {
    return {
      type: "FILTER_HEIGHT", 
      payload
    }
  }