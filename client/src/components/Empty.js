import React from "react"

const Empty = () =>{ //Component that only shows a message that the user has no vehicles in the database
    return(
        <h1 className="mt-5" style={{color:"white"}}>You don't have any vehicles yet, add the first one!</h1>
    )
}

export default Empty;