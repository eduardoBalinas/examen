import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import Menu from "../components/Menu"


const Detail = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [ isLogin, setIsLogin ] = useState(false)
    const [ token, setToken ] = useState()
    const [ data, setData ] = useState()


    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token) {
            navigate("/login")
        }
        setToken(token)
        setIsLogin(true)
    },[])

    useEffect(() => {
        const id = location.pathname.split("/")[2]
        if(isLogin) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8000/api/posts/search/' + id,
                headers: { 
                  'Authorization': 'Bearer ' + token
                }
              };
              
              axios.request(config)
              .then((response) => {
                if(response.status === 200) {
                    setData(response.data.post);
                }
              })
              .catch((error) => {
                console.log(error);
              });
        }


    },[isLogin])

    return(
        <>
            <Menu />
            <div className="container">
                <h2 className="text-center mt-2">{ data ? data.title : null }</h2>
                <h6>Autor: { data ? data.autor : null  }</h6>
                <h6>Fecha de publicacion: { data ? data.updatedAt.split("T")[0] : null  }</h6>

                <p>{ data ? data.contenido : null }</p>
            </div>
        </>
        
    )
}

export default Detail