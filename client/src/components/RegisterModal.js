import React from "react"
import Modal from "react-bootstrap/Modal" //Stylesheets and imges
import logo from "../public_imgs/logo.png"
import "../styles/Modal.css"
import api from "./axios" //Axios utility
import Vehicle from "../classes/Vehicle" //Vehicle class to send to server
import Swal from 'sweetalert2' //Alert package
import RegisterModalBody from "./RegisterModalBody" //Body component of this modal

class RegisterModal extends React.Component{ //Component that represents the modal when the user registers a new vehicle

    constructor(props){ //State variables used to create a new vehicle
        super(props)
        this.state={
            brand:"",
            plates:"",
            year:"",
            currentState:"",
            model:"",
            type:"",
            color:"",
            niv:"",
            gasoline:"",
            circulation:"",
        }
        this.handleInputChange=this.handleInputChange.bind(this) //Function bindings
        this.registerVehicle=this.registerVehicle.bind(this)
        this.fireSuccessAlert=this.fireSuccessAlert.bind(this)
        this.fireFailureAlert=this.fireFailureAlert.bind(this)
        this.validateInputs=this.validateInputs.bind(this)
    }

    registerVehicle(e){ //Function that registers a new vehicle, new vehicle instance is create and filled with the state variables, we then send the data to the server
        if(this.validateInputs()){ //Validate that all the inputs are correct
            this.props.onHide();
            const vehicle= new Vehicle(this.state.brand,this.state.plates,this.state.year,this.state.currentState,this.state.model,
                                       this.state.type,this.state.color,this.state.niv,this.state.gasoline,this.state.circulation)
            api.post('/createVehicle',vehicle,{
                headers:{
                    authorization: "Bearer "+localStorage.getItem("authToken")
                }
            }).then((response)=>{ //If response succesful then we fire a success alert and we set the state data back to empty
                this.fireSuccessAlert()
                this.setState({
                    brand:"",
                    plates:"",
                    year:"",
                    currentState:"",
                    model:"",
                    type:"",
                    color:"",
                    niv:"",
                    gasoline:"",
                    circulation:""
                })
            }).catch((err)=>{
                this.fireFailureAlert("Oops . . something went wrong");
            });
            this.props.refreshData()
        }
        else this.fireFailureAlert("Please check that all fields are correct and filled . . .");
        
        
     
    }

    //Function that checks if any input is not filled and if the year input is not a number, return true if they are correct, false otherwise
    validateInputs(){
        if(this.state.brand === "" || this.state.plates === "" || (this.state.year==="" || isNaN(this.state.year)) || this.state.currentState==="" || this.state.model==="" || this.state.type==="" || this.state.color==="" || this.state.niv==="" || this.state.gasoline==="" || this.state.circulation===""){
            return false;

        }
        else{
            return true;
        }
    }


    //Success alert
    fireSuccessAlert(){
        Swal.fire({
            title: 'Drivvu',
            text: 'Vehicle Added Succesfully',
            icon: 'success',
            timer:2500
        })
    }

    //Error alert with custom msg
    fireFailureAlert(msg){
        Swal.fire({
            title: 'Drivvu',
            text: msg,
            icon: 'error',
            timer:2500
        })
    }

    //Function that changes all of the variables in the state depending of the input being filled
    handleInputChange(e){
        const name=e.target.name;
        const value=e.target.value;
        this.setState({
        [name]: value });
        
    }

    //Render of the modal with its body component
    render(){
        return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered className="modalF myModal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="justify-content-center">
                        <img alt="" width="30%" height="30%" className="pt-n5 mt-n3 mb-n4" src={logo}/>
                        <h3>Register Vehicle</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterModalBody handleInputChange={this.handleInputChange} />
    
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={this.props.onHide}>Close</button>
                    <button className="btn btn-dark" onClick={this.registerVehicle}>Save</button>
                </Modal.Footer>
            </Modal>
        )
    }
   


}

export default RegisterModal; //Make component visible