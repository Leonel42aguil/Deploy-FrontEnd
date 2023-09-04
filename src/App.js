import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Details from './components/details/Details';
import DogsCreated from './components/dogsCreated/DogsCreated';
import Home from './components/home/Home';
import LandingPage from './components/landingPage/LandingPage';

function App() { 
  return (  
    <div className="App">
      <BrowserRouter>
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Home} />
      <Route exact path="/dog/:id" component={Details} />
      <Route path='/create' component={DogsCreated} />
      </BrowserRouter>
    </div>
  );
}

export default App;
 