// import logo from './logo.svg';
import './App.css';
import AvailableVacation from './home';
import { BrowserRouter, Switch, Route, } from "react-router-dom";

function App() {
 
  return (

    <BrowserRouter>

        <Switch>
          <Route exact path="/" component={AvailableVacation} />
          </Switch>
          </BrowserRouter>
  );
}

export default App;
