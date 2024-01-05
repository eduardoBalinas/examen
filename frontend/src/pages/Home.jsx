import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';
import Menu from '../components/Menu';
import Grid from '../components/Grid';
import axios from 'axios';


const Home = () => {

    const navigate = useNavigate()
    const [ token, setToken ] = useState()
    const [ isLogin, setIsLogin ] = useState(false)
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
        if(isLogin) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8000/api/posts/allPost',
                headers: { 
                  'Authorization': 'Bearer ' + token
                }
              };
              
              axios.request(config)
              .then((response) => {
                setData(response.data.allPost)
              })
              .catch((error) => {
                console.log(error);
              });
        }
    }, [isLogin])

    const handleSearch = (e) => {
        console.log(e.target.value)
    }

    return(
        <div>
            <Menu change={handleSearch}/>
            <h2 className='text-center mt-5'>¡Ve de lo que todo el mundo habla!</h2>
            <Grid data={data} />
        </div>
    )
}

export default Home;