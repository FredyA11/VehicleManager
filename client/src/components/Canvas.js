import React,{useState} from "react";
import Row from "react-bootstrap/Row"; //Bootstrap rows and columns
import Col from "react-bootstrap/Col";
import coche from "../public_imgs/coche.png"; //Default image for all vehicles
import "../styles/Canvas.css"; //Stylesheets
import "../styles/Buttons.css"
import DataColumn from "./DataColumn"; //Column to show vehicle data component
import right from "../public_imgs/less.png"; //Image for previous vehicle
import next from "../public_imgs/next.png"; //Image for next vehicle
import { faPencilAlt ,faTrashAlt} from '@fortawesome/free-solid-svg-icons' //Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //Import more icons
import EditModal from "./EditModal" //Import the edit modal component

const Canvas= (props) =>{ //Component for displaying the vehicle's information to the user
    
    const [showEditModal,setShowEditModal]=useState(false); //hook to show the edit vehicle modal
    
    //Function to show the edit modal
    function showModal(){
        setShowEditModal(true)
    }

    //Function to hide the edit modal
    function hideModal(){
        setShowEditModal(false)
    }

    return( //Just return 2 columns with the vehicle's info , a default image on the center with the brand and model, and the 2 buttons to edit and delete the vehicle, with the edit modal as well
        
        <Row className="mb-5 justify-content-center animate__fadeInDown animate__animated">
            <DataColumn title1="Plates" var1={props.vehicle.plates} title2="Serial Number" var2={props.vehicle.niv} title3="Vehicle Type" var3={props.vehicle.type}  title4="Fuel Type" var4={props.vehicle.gasoline} />
            <Col lg={5} xl={5} md={5} sm={5} xs={5} className="justify-content-center ">
                <Row>
                    <Col xl={12} lg={12} sm={12} md={12} className="text-center">
                        <h1 style={{color:"white"}}>{props.vehicle.brand} {props.vehicle.model}</h1> 
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col xl={12} lg={12} sm={12} md={12} xs={12} className="justify-content-center d-flex">
                        <img alt="" src={right} onClick={props.decrement} className="align-self-center img-fluid" style={{cursor:"pointer"}}  />
                        <img alt="" src={coche}   className="align-self-center img-fluid"></img>
                        <img alt="" src={next} onClick={props.increment} className="align-self-center img-fluid" style={{cursor:"pointer"}}  />
                    </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Col xl={6} lg={6} sm={6} md={6} xs={12} className="justify-content-center">
                        <button onClick={showModal} className="radiusBtn btn btn-info rounded-circle animate__animated animate__heartBeat"><FontAwesomeIcon icon={faPencilAlt} /></button>
                        <h5 className="pt-3" style={{color:"white"}}>E D I T</h5>
                    </Col>
                    <Col xl={6} lg={6} sm={6} md={6} xs={12} className="justify-content-center">
                
                        <button onClick={props.deleteFunc} className="btn btn-danger deleteBtn animate__animated animate__heartBeat"><FontAwesomeIcon icon={faTrashAlt} /></button>
                        <h5 className="pt-3" style={{color:"white"}}>D E L E T E</h5>
                    </Col>
                </Row>
            </Col>
            <DataColumn title1="Year" var1={props.vehicle.year} title2="Color" var2={props.vehicle.color} title3="State" var3={props.vehicle.currentState}  title4="Circulation Number" var4={props.vehicle.circulation} />
            <EditModal  show={showEditModal} vehicle={props.vehicle} refreshData={props.refreshData} onHide={hideModal}  />
        </Row>
    )

}

export default Canvas; //Make component visible to others