import React,{useState} from "react" //usestate hooks
import Row from "react-bootstrap/Row" //bootstrap and stylesheets
import Col from "react-bootstrap/Col"
import "../styles/Container.css"
import "../styles/Login.css"
import logo from "../public_imgs/logo2.png" //app logo
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'  //Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //More icons
import Swal from "sweetalert2"; //Alerts
import axios from "./axios";
import User from "../classes/User"; //User utility class
import {Link} from "react-router-dom" //Link component to navigate pages

const Register = ()=>{ //Component that lets users register on the app
    const [password,setPassword]=useState(""); //State variables to register a user
    const [userName,setUsername]=useState("");
    const [email,setEmail]=useState("");


    async function createUser(){ //Function that makes the request to the server in order to create a new user
        if(validateInputs()){ //If inputs are correct make the request and either show a success or error alert
            const user= new User(userName,email,password);
            const res= await axios.post("/createUser",user);
            const data= await res.data.success;
            if(data){
                successAlert();
            }
            else errorAlert("Username or email already exists . . ");
            
        }
        else errorAlert("Please fill all the required inputs and check that the username does not contain . % $ [ or ] ...");
        
        
    }

    function successAlert(){ //show success alert
        Swal.fire({
            title: 'Drivvu',
            text: "New Account created",
            icon: 'success',
            timer:1000
        })
    }

    function errorAlert(msg){ //show error alert with custom msg
        Swal.fire({
            title: 'Drivvu',
            text: msg,
            icon: 'error',
            timer:2500
        })
    }

    function validateInputs(){  //function to check that all inputs are completed and correctly formatted, returns true if they are correct
        if((userName==="" || userName.includes(".") || userName.includes("$") || userName.includes("#") || userName.includes("[") || userName.includes("]")) || password==="" || email===""){
            return false;
        }
        return true;
    }


    function handleUsername(e){ //change state of username when user types
        setUsername(e.target.value);
    }

    function handlePassword(e){ //change state of password when user types
        setPassword(e.target.value);
    }

    function handleEmail(e){ //change state of email when user types
        setEmail(e.target.value);
    }

    return( //Render the component
        <div className="container-fluid ">
            <Row className="myC animate__fadeInDown animate__animated">
                <Col className="myCol cardContainer" xl={4} lg={5} md={6} sm={8} xs={10}>
                    <Row>
                        <Col className="justify-content-center" xl={12} lg={12} md={12} sm={12} xs={12}>
                            <img alt="" className="mx-auto d-block " src={logo} width="30%" heigh="30%" />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="justify-content-center d-flex" xl={12} lg={12} md={12} sm={12} xs={12}>
                            <FontAwesomeIcon icon={faEnvelope} size="lg" className="mt-2 mr-3" />
                            <h3>Email</h3>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        <Col className="justify-content-center" xl={5} lg={12} md={12} sm={12} xs={12}>
                            <input onChange={handleEmail} className="form-control text-center shadow" type="email" placeholder="Your Email" />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col className="justify-content-center d-flex" xl={12} lg={12} md={12} sm={12} xs={12}>
                            <FontAwesomeIcon icon={faUser} size="lg" className="mt-2 mr-3" />
                            <h3>Username</h3>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        <Col className="justify-content-center" xl={5} lg={12} md={12} sm={12} xs={12}>
                            <input onChange={handleUsername} className="form-control text-center shadow" type="text" placeholder="Your Username" />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col className="justify-content-center d-flex" xl={12} lg={12} md={12} sm={12} xs={12}>
                            <FontAwesomeIcon icon={faLock} size="lg" className="mt-2 mr-3" />
                            <h3>Password</h3>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        <Col className="justify-content-center" xl={5} lg={12} md={12} sm={12} xs={12}>
                            <input onChange={handlePassword} className="form-control text-center shadow" type="password" placeholder="******" />
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-5 mb-5">
                        <Col className="justify-content-center text-center" xl={4} lg={12} md={12} sm={12} xs={12}>
                            <button onClick={createUser} className="btn btn-danger btn-block">Create Account</button>
                            <p className="pt-5">Already have an account? </p>
                            <Link to="/"><p className="pt-1" style={{color:"cyan"}}>Login </p></Link>
                            
                        </Col>
                    </Row>
                   
                </Col>
            </Row>
        </div>
    )

}

export default Register; //Make component visible