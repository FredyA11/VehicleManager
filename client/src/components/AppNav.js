import React from "react"
import Navbar from "react-bootstrap/Navbar"
import logo from "../public_imgs/logo2.png"

const AppNav = () =>{ //Component for the navbar (the logo)

    return( //Return a normal bootstrap navbar with the software logo on top
        <Navbar className="justify-content-center" >
            <Navbar.Brand href="#home">
            <img
                src={logo}
                width="200"
                height="150"
                className="mt-n3 ml-5 d-inline-block align-top"
                alt="Drivvu Logo"
            />
            </Navbar.Brand>
      </Navbar>
    )
}

export default AppNav;//Export the component