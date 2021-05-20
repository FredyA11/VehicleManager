import React from "react"
import Modal from "react-bootstrap/Modal" //Modal from bootstrap
import logo from "../public_imgs/logo.png" //Images and stylesheets
import "../styles/Modal.css" 
import api from "./axios" //Axios utility
import Vehicle from "../classes/Vehicle" //We get the vehicle class to pass through the server
import Swal from 'sweetalert2' //Alert package
import EditModalBody from "./EditModalBody" //Modal's body


class EditModal extends React.Component{

    constructor(props){ 
        super(props)
        this.state={ //State variables with props values as inital values
            brand:props.vehicle.brand,
            plates:props.vehicle.plates,
            year:props.vehicle.year,
            currentState:props.vehicle.currentState,
            model:props.vehicle.model,
            type:props.vehicle.type,
            color:props.vehicle.color,
            niv:props.vehicle.niv,
            gasoline:props.vehicle.gasoline,
            circulation:props.vehicle.circulation
        }
        this.handleInputChange=this.handleInputChange.bind(this) //Function bindings to the context of the component
        this.updateVehicle=this.updateVehicle.bind(this)
        this.fireSuccessAlert=this.fireSuccessAlert.bind(this)
        this.fireFailureAlert=this.fireFailureAlert.bind(this)
        this.validateInputs=this.validateInputs.bind(this)
    }

    updateVehicle(e){ //Function that will update a vehicle information
        if(this.validateInputs()){ //Validate all inputs and make the request to the server, if successful we fire a success alert, otherwise we fire an error alert
            this.props.onHide();
            const vehicle= new Vehicle(this.state.brand,this.state.plates,this.state.year,this.state.currentState,this.state.model,
                                    this.state.type,this.state.color,this.state.niv,this.state.gasoline,this.state.circulation)
            api.put('/updateVehicle/'+this.props.vehicle.key,vehicle,{
                headers:{
                    authorization: "Bearer "+localStorage.getItem("authToken")
                }
            }).then((response)=>{
                
                this.fireSuccessAlert()
                
            }).catch((err)=>{
                this.fireFailureAlert("Oops... something went wrong")
            });
            this.props.refreshData(); //Get the data from the database
        }
        else{
            this.fireFailureAlert("Please check that all fields are correct and filled . . .")
        }        
    }

    //Function that validates that the modal inputs are correct and fille, return true if correct, false otherwise
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
            text: 'Vehicle Updated Succesfully',
            icon: 'success',
            timer:2500
        })
    }

    //Error alert with custom message
    fireFailureAlert(msg){
        Swal.fire({
            title: 'Drivvu',
            text: msg,
            icon: 'error',
            timer:2500
        })
    }

    //Function that handles setting the value of a variable in the state when user enters something in the input fields
    handleInputChange(e){
        const name=e.target.name;
        const value=e.target.value;
        this.setState({
        [name]: value });
        
    }


    render(){ //Modal render with all of the inputs
        
        return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered className="modalF"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="justify-content-center">
                        <img alt="" width="30%" height="30%" className="pt-n5 mt-n3 mb-n4" src={logo}/>
                        <h3>Update Vehicle</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditModalBody handleInputChange={this.handleInputChange} vehicle={this.props.vehicle} />
    
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={this.props.onHide}>Close</button>
                    <button className="btn btn-dark" onClick={this.updateVehicle}>Save</button>
                </Modal.Footer>
            </Modal>
        )
    }
   


}

export default EditModal;