import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = ({ setData, setReload, reload, showInput }) => {

    const navigate = useNavigate();

    const [ formValue, setFormValue ] = useState({
        search: ''
    })

    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate("/login");
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(formValue.search === '') {
            setReload(!reload);
            return
        }
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/api/posts/filter?q=' + formValue.search,
            headers: { 
              'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
          };
          
          axios.request(config)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        
        }

    const handleChangeFormValue = (event) => {
        const { name, value } = event.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    }
    

    return (

        <nav className="container navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Blogs</a>
                <a onClick={() => navigate("/muro")} style={{ cursor: "pointer" }}>Muro</a>
                {
                    showInput ? <form className="d-flex" onSubmit={handleSubmit}>
                    <input className="form-control me-2" type="text" value={ formValue.search } name='search' placeholder="Search" onChange={(e) => handleChangeFormValue(e)} aria-label="Search" />
                   <button className="btn btn-outline-success" type="submit">Search</button>
                 </form> : null
                }
                <a onClick={() => handleLogOut()} style={{ cursor: "pointer" }}>Log Out</a>
            </div>
        </nav>
    )

}

export default Menu