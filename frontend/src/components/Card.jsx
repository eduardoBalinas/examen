import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id ,title, autor, contenido }) => {

    const navigate = useNavigate()

    const handleRedirect = ( id ) => {
        navigate("/post/" + id)
    }

    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{ title }</h5>
                <p className="card-text">{ autor }</p>

                <p className="card-text">{ contenido.split(" ").slice(0,60).join(" ") + "..." }</p>
                <button type="button" className="btn btn-primary" onClick={ () => handleRedirect(id) }>Saber Mas</button>
            </div>
        </div>
    )
}

export default Card;