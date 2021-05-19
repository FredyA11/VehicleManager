import React from "react"
import Spinner from "react-bootstrap/Spinner" //Spinner from bootstrap

const LoadingC = ()=>{ //Component that shows a loading spinner that will be shown whenever the app is fetching data

    return(
        <Spinner animation="border" size="lg" variant="danger" />
    )
}

export default LoadingC;