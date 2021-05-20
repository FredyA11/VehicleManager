import React from "react"
import { faCar , faAd, faTruck, faCalendarMinus, faBrush, faIdCard, faGasPump } from '@fortawesome/free-solid-svg-icons' //Icons and more icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Row from "react-bootstrap/Row" //Bootstrap stuff
import Col from "react-bootstrap/Col"

const RegisterModalBody=(props)=>{ //Component that represents the body of the register modal, input change function is passed through props
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
                            <input name="brand" onChange={props.handleInputChange} type="text" className="form-control" />
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
                            <input name="plates" onChange={props.handleInputChange} type="text" className="form-control" />
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
                            <input name="year" onChange={props.handleInputChange} type="number" className="form-control" />
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
                            <input name="currentState" onChange={props.handleInputChange} type="text" className="form-control" />
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
                            <input name="gasoline" onChange={props.handleInputChange}  type="text" className="form-control" />
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
                            <input name="model" onChange={props.handleInputChange} type="text" className="form-control" />
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
                            <input name="type" onChange={props.handleInputChange} type="text" className="form-control" />
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
                            <input name="color" onChange={props.handleInputChange} type="text" className="form-control" />
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
                            <input name="niv" onChange={props.handleInputChange} type="text" className="form-control" />
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
                            <input name="circulation" onChange={props.handleInputChange} type="text" className="form-control" />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
                    
    )
}

export default RegisterModalBody; //Expose component to others