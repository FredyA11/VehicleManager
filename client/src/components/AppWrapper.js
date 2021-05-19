import React from "react"
import AppNav from "./AppNav" //Navbar and the app container
import Container from "./Container"
import {Redirect} from "react-router-dom" //Redirect component 
import '../App.css'; //Stylesheet

const AppWrapper= (props)=>{ //Component that containes the main app

    if(!props.authorized){ //If someone tries to enter to this page, it will be redirected to the login page, in order to gain access users must log in to the plattform
        return <Redirect to="/" />
    }
    return(
        <div className="App container-fluid">
            <AppNav />
            <Container />
        </div>
    )
}

export default AppWrapper; //Make the component visible