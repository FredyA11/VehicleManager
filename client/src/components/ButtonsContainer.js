import React from "react" 
import Row from "react-bootstrap/Row" //Import bootstrap rows and columns for styling
import Col from "react-bootstrap/Col"
import "../styles/Buttons.css" //Stylesheet
import { faPlus } from '@fortawesome/free-solid-svg-icons' //Import the icons used in the button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //More icons


const ButtonsContainer = (props) =>{ //Component that just returns a row with the add new vehicle button, a function to show the modal is passed through props and activated on button click
    return(
        <Row className="spaceTop justify-content-center">
            <Col lg={6} xl={6} sm={6} md={6} className="justify-content-center">
                <button onClick={props.showModal} className="btn btn-light addBtn animate__animated animate__heartBeat"><FontAwesomeIcon icon={faPlus} /></button>
                <h3 className="mt-3" style={{color:"white"}}>A D D</h3>
            </Col>
        </Row>
    )
}

export default ButtonsContainer;