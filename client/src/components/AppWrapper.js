import React from "react"
import AppNav from "./AppNav"
import Container from "./Container"
import {Redirect} from "react-router-dom"
import '../App.css';

const AppWrapper= (props)=>{

    if(!props.authorized){
        return <Redirect to="/" />
    }
    return(
        <div className="App container-fluid">
            <AppNav />
            <Container />
        </div>
    )
}

export default AppWrapper;