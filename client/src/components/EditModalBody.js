import React from "react"
import { faCar , faAd, faTruck, faCalendarMinus, faBrush, faIdCard, faGasPump } from '@fortawesome/free-solid-svg-icons'  //Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //More icons
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const EditModalBody= (props)=>{ //Component of the edit modal, this is the body with all of the inputs, props are used as defualt values for inputs and onchange handler is passed through props
    return(
        <div className="container-fluid">
            <Row>
                <Col xl={6} lg={6} sm={6} md={6}>
                    <Row>
                        <Col xl={12} lg={12} sm={12} md={12} className="d-flex">
                            <FontAwesomeIcon icon={faCar} size="lg" className="mt-2" />
                            <h4 className="pl-2">Brand</h4>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xl={12} lg={12} sm={12} md={12} >
                            <input name="brand" onChange={props.handleInputChange} defaultValue={props.vehicle.brand}  type="text" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xl={12} lg={12} sm={12} md={12} className="d-flex ">
                            <FontAwesomeIcon icon={faAd} size="lg" className="mt-2" />
                            <h4 className="pl-2">Plates</h4>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xl={12} lg={12} sm={12} md={12} >
                            <input name="plates" onChange={props.handleInputChange} defaultValue={props.vehicle.plates}  type="text" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xl={12} lg={12} sm={12} md={12} className="d-flex">
                            <FontAwesomeIcon icon={faCalendarMinus} size="lg" className="mt-2" />
                            <h4 className="pl-2">Model Year</h4>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xl={12} lg={12} sm={12} md={12} >
                            <input name="year" onChange={props.handleInputChange} defaultValue={props.vehicle.year}  type="number" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xl={12} lg={12} sm={12} md={12} className="d-flex">
                            <FontAwesomeIcon icon={faIdCard} size="lg" className="mt-2" />
                            <h4 className="pl-2">Current State</h4>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xl={12} lg={12} sm={12} md={12} >
                            <input name="currentState" onChange={props.handleInputChange} defaultValue={props.vehicle.currentState}  type="text" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xl={12} lg={12} sm={12} md={12} className="d-flex">
                            <FontAwesomeIcon icon={faGasPump} size="lg" className="mt-2" />
                            <h4 className="pl-2">Fuel Type</h4>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xl={12} lg={12} sm={12} md={12} >
                            <input name="gasoline" onChange={props.handleInputChange} defaultValue={props.vehicle.gasoline}   type="text" className="form-control" />
                        </Col>
                    </Row>
                </Col>
                <Col xl={6} lg={6} sm={6} md={6}>
                    <Row>
                        <Col xl={12} lg={12} sm={12} md={12} className="d-flex">
                            <FontAwesomeIcon icon={faCar} size="lg" className="mt-2" />
                            <h4 className="pl-2">Model</h4>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xl={12} lg={12} sm={12} md={12} >
                            <input name="model" onChange={props.handleInputChange} defaultValue={props.vehicle.model}  type="text" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xl={12} lg={12} sm={12} md={12} className="d-flex">
                            <FontAwesomeIcon icon={faTruck} size="lg" className="mt-2 " />
                            <h4 className="pl-2">Type of vehicle</h4>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xl={12} lg={12} sm={12} md={12} >
                            <input name="type" onChange={props.handleInputChange} defaultValue={props.vehicle.type}  type="text" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xl={12} lg={12} sm={12} md={12} className="d-flex ">
                            <FontAwesomeIcon icon={faBrush} size="lg" className="mt-2" />
                            <h4 className="pl-2">Color</h4>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xl={12} lg={12} sm={12} md={12} >
                            <input name="color" onChange={props.handleInputChange} defaultValue={props.vehicle.color}  type="text" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xl={12} lg={12} sm={12} md={12} className="d-flex ">
                            <FontAwesomeIcon icon={faIdCard} size="lg" className="mt-2" />
                            <h4 className="pl-2">Vehicle Identification Number</h4>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xl={12} lg={12} sm={12} md={12} >
                            <input name="niv" onChange={props.handleInputChange} defaultValue={props.vehicle.niv}  type="text" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xl={12} lg={12} sm={12} md={12} className="d-flex ">
                            <FontAwesomeIcon icon={faIdCard} size="lg" className="mt-2" />
                            <h4 className="pl-2">Circulation ID</h4>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xl={12} lg={12} sm={12} md={12} >
                            <input name="circulation" onChange={props.handleInputChange} defaultValue={props.vehicle.circulation}  type="text" className="form-control" />
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )

}

export default EditModalBody;