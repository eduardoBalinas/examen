import React from "react"
import Card from "./Card"

const Grid = ({ data }) => {
    
    return(
        <div className="container">
            <div className="row">
                {
                    data && data.length > 0 ?  data.map(d => (
                        <div className="col-md-3 mt-5" key={d.id}>
                            <Card {...d}/>
                        </div>
                    )) : null
                }
            </div>
        </div>
    )
}

export default Grid