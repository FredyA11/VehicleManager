
import React,{useState} from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppWrapper from "./components/AppWrapper"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register";

function App() {
  const [authorized,setAuthorized]=useState(false)

  function allowAccess(){
    setAuthorized(true)
  }

  return (
    <Router>
      <Switch >
        <Route exact path="/" component={()=><Login allowAccess={allowAccess} />} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={()=> <AppWrapper authorized={authorized} />}/>
      </Switch>
    </Router>
    
  );
}

export default App;
