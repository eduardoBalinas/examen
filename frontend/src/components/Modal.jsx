import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "./Input";

const Modal = ({ token, setIsOpen, setReload, reload }) => {
    const [formValues, setFormValues] = useState({
        title: '',
        contenido: '',
    });

    const handleChangeFormValue = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let data =  formValues;
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/api/posts/addPost',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + token
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            if(response.status === 200) {
                setReload(!reload);
                setIsOpen(false)
            }
        })
          .catch((error) => {
            console.log(error);
          });
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2 className="modal-title">Add Post</h2>
                    <button className="btn-close" onClick={() => setIsOpen(false)}>&times;</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <Input
                            id={"title"}
                            placeholder={"Titulo"}
                            type={"text"}
                            value={formValues.titulo}
                            change={handleChangeFormValue}
                        />
                        <textarea className="form-control" value={formValues.contenido} required name="contenido" onChange={handleChangeFormValue} cols="30" rows="10"></textarea>
                        <button type="submit" className="btn btn-primary" >
                            Guardar cambios
                        </button>
                        <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                            Cerrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal;