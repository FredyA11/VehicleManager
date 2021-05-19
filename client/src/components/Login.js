import React,{useState} from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "../styles/Container.css"
import "../styles/Login.css"
import {useHistory} from "react-router-dom";
import logo from "../public_imgs/logo2.png"
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'  //Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //More icons
import Swal from "sweetalert2";
import axios from "./axios"
import {Link} from "react-router-dom"

const Login = (props)=>{
    const history=useHistory();
    const [password,setPassword]=useState("");
    const [userName,setUsername]=useState("");

    async function loginUser(){
        if(validateInputs()){
            const dataH={
                userName:userName,
                password:password
            }
            const res= await axios.post("/loginUser",dataH);
            const data= await res.data.token;
            if(data!=="failure"){
                welcomeAlert();
                props.allowAccess();
                localStorage.setItem("authToken",data);
                history.push("/home");
            }
            else{
                errorAlert("Password or username invalid . . .");
            }
        }
        else{
            errorAlert("Please fill out all the inputs required and check that username does not contain . $ % [ or ] ");
        }
        
        
    }

    function welcomeAlert(){
        Swal.fire({
            title: 'Drivvu',
            text: "Welcome to Drivvu",
            icon: 'success',
            timer:1000
        })
    }

    function errorAlert(msg){
        Swal.fire({
            title: 'Drivvu',
            text: msg,
            icon: 'error',
            timer:2500
        })
    }

    function validateInputs(){
        if((userName==="" || userName.includes(".") || userName.includes("$") || userName.includes("#") || userName.includes("[") || userName.includes("]"))  || password===""){
            return false;
        }
        return true;
    }


    function handleUsername(e){
        setUsername(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    return(
        <div className="container-fluid ">
            <Row className="myC">
                <Col className="myCol cardContainer" xl={4} lg={10} md={10} sm={10} xs={10}>
                    <Row>
                        <Col className="justify-content-center" xl={12} lg={12} md={12} sm={12} xs={12}>
                            <img alt="" className="mx-auto d-block " src={logo} width="30%" heigh="30%" />
                        </Col>
                    </Row>
                    <Row className="mt-3">
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
                            <button onClick={loginUser} className="btn btn-danger btn-block">Login</button>
                            <p className="pt-5">Don't have an account yet? </p>
                            <Link to="/register"><p className="pt-1" style={{color:"cyan"}}>Register </p></Link>
                        </Col>
                    </Row>
                   
                </Col>
            </Row>
        </div>
    )

}

export default Login;