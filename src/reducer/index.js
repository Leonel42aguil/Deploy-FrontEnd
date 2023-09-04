const initialState = {
  dogs: [],
  allDogs: [],
  dogsHome: [],
  alldogsFilter: [],
  details:[],
  temperaments: [],
  selectedTemperaments: [],
};
 
function rootReducer(state = initialState, action) {
  switch (action.type) {
    //✅ BUSQUEDA POR RAZA
    case "GET_NAME_RAZA":
      return {
        ...state,
        dogs: action.payload,
      };

    //✅ NOS TRAE TODOS LOS DOGS
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
        dogsHome: action.payload
      }; 
    
    //✅ NOS FILTRA POR ALTURA
    case "FILTER_HEIGHT":
      const orderAltura = action.payload === "height_max" ? state.dogs.slice().sort(function (a,b) {//
        if (parseInt(a.height_min) < parseInt(b.height_min)) {
          return -1//Se coloca -1 para que A antes de que B
        }
        if (parseInt(a.height_min) < parseInt(b.height_min)) {
          return 1//Para que A se coloque despues de B
        }
        return 0//Si los elementos son iguales se coloca 0
      }) : 
      state.dogs.slice().sort(function (a,b){
        if (parseInt(a.height_min) > parseInt(b.height_min)) {
          return -1
        }
        if (parseInt(a.height_min) > parseInt(b.height_min)) {
          return 1
        }
        return 0
      })
        return {
          ...state,
          dogs: orderAltura
      }

    //✅ORDER POR PESO
    case "ORDER_BY_WEIGHT":
      const orderDogsKg =
        action.payload === "peso_des"
          ? state.dogs.slice().sort(function (a, b) {
              if (parseInt(a.weight_min) < parseInt(b.weight_min)) {
                return 1;
              }
              if (parseInt(b.weight_min) < parseInt(a.weight_min)) {
                return -1;
              }
              return 0;
            })
          : state.dogs.slice().sort(function (a, b) {
              if (parseInt(a.weight_min) > parseInt(b.weight_min)) {
                return 1;
              }
              if (parseInt(b.weight_min) > parseInt(a.weight_min)) {
                return -1;
              } 
              return 0;
            });
      return {
        ...state,
        dogs: orderDogsKg,
      };

       //✅ FILTRA POR ORDEN A-Z - Z-A
       case 'ALPHABETICAL_SORT':   
       let sortedDogs = [...state.dogs]       
       sortedDogs = action.payload === 'a' ?
       state.dogs.sort(function(a, b) {//Ordeno utilizando el metodo sort, la ordenacion en depende el payloan que le llega
         if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;//Si es mayor indica que la segunda raza debe ir antes en la lista
         if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
         return 0;
       }) :
       state.dogs.sort(function(a, b) {
         if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
         if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
         return 0;
       });          
       return {
         ...state,
         dogs: sortedDogs
       };

         //✅ NOS TRAE TODOS LOS TEMPERAMENTOS  
      case "GET_TEMPERAMENTS":
        // const alltemp = action.payload === "allTemps" ? state.allDogs : action.payload
        return {
          ...state,
          temperaments: action.payload 
        };

      case 'ADD_SELECTED_TEMPERAMENT':
       if (state.selectedTemperaments.includes(action.payload)) {
       alert('No se puede seleccionar el mismo temperamento dos veces')
       alert('Eliminalo')
      return state
    } else {
      return {
       ...state,
       selectedTemperaments: [...state.selectedTemperaments, action.payload]
      }
    }


    //✅
    // case "ORDER_BY_NAME":
    //   let sortedArr =
    //     action.payload === "asc"
    //       ? state.dogs.sort(function (a, b) {
    //           if (a.name > b.name) return 1;
    //           if (b.name > a.name) return -1;
    //           return 0;
    //         })
    //       : state.dogs.sort(function (a, b) {
    //           if (a.name > b.name) return -1;
    //           if (b.name > a.name) return 1;
    //           return 0;
    //         });
    //   return {
    //     ...state,
    //     dogs: sortedArr,
    //   };
    
    //✅ FILTRO DE CREATED, API , EXISTENTE
    case "FILTER_CREATED":
      const alldogsFilter = state.allDogs;
      const createdFilter =
      // action.payload === "created"
          action.payload === "all"
          // ? alldogsFilter.filter((e) => e.createdIndb)
          ? alldogsFilter
          : alldogsFilter.filter((e) => e.createdIndb);//createdIndb
          return {
            ...state,
            // alldogsFilter: action.payload === "all" ? state.alldogsFilter : createdFilter
            dogs: createdFilter
          };
          
          //✅ 
          case "DOG_POST": //Devolveme state, porque lo vamos a crear en una ruta nueva
            return {
              ...state,
            };

            //✅ DETAIL POR ID 
            case 'GET_DETAILS':
              return {
                ...state,
                details: action.payload
              }
    default:
      return state;
  }
}

export default rootReducer;
