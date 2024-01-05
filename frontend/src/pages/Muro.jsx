import React, { useEffect, useState } from "react";
import axios from "axios";
import * as jwt_decode from 'jwt-decode';
import Menu from "../components/Menu";
import Grid from "../components/Grid";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const Muro = () => {

    const navigate = useNavigate()
    const [ token, setToken ] = useState()
    const [ isLogin, setIsLogin ] = useState(false)
    const [ isOpen, setIsOpen ] = useState(false)
    const [ data, setData ] = useState()
    const [ strToken, setStrToken ] = useState()
    const [ reload, setRealod ] = useState(false)
    const [ isEdit, setIsEdit ] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token) {
            navigate("/login")
        }
        setStrToken(jwt_decode.jwtDecode(token));

        setToken(token)
        setIsLogin(true)
    },[])

    useEffect(() => {
        if(isLogin || reload ) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8000/api/posts/userPosts',
                headers: { 
                  'Authorization': 'Bearer ' + token
                }
              };
              
              axios.request(config)
              .then((response) => {
                setData(response.data.userPosts);
              })
              .catch((error) => {
                console.log(error);
              });
        }
    },[isLogin, reload])

    return (
        <div className="container">
            <Menu setData={setData} setReload={ setRealod } reload={reload} showInput={true}/>
            <h2 className='text-center mt-5'>¡Bienvenido a tu muro { strToken ? strToken.username: null } !</h2>
            <button type="button" className="btn btn-success mb-4"  onClick={ () => setIsOpen(true) }>Agregar post</button>
            { isOpen ? <Modal  token={ token } setIsOpen={setIsOpen} setReload={setRealod} reload={reload}  /> : null }
            { data && data.length > 0 ? <Table data={data} token={token} setReload={ setRealod } reload={reload} setIsOpen={setIsOpen} /> : <h1 className="text-center">Aun no hay publicaciones</h1>}
        </div>
    )
}

export default Muro;