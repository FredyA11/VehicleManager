import React from "react"
import Col from "react-bootstrap/Col"
import "../styles/Container.css"

const DataColumn=(props)=>{ //Component that represents a column in the canvas that contains the vehicle info, we just pass the data through props
    return(
        <Col lg={3} xl={3} md={10} sm={12} xs={10} className="pt-4 pb-4 cardContainer"> 
                <h2>{props.title1}</h2>
                <h4>{props.var1}</h4>
                <h2 className="mt-5 ">{props.title2}</h2>
                <h4>{props.var2}</h4>
                <h2 className="mt-5">{props.title3}</h2>
                <h4>{props.var3}</h4>
                <h2 className="mt-5">{props.title4}</h2>
                <h4>{props.var4}</h4>
        </Col>
    )
}

export default DataColumn;