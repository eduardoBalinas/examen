import React, { useState } from 'react';
import { redirect, useNavigate } from "react-router-dom";
import axios from 'axios'
import Input from '../components/Input';
import Alert from '../components/Alert';

const Login = () => {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
      });

    const [isLoginError, setIsLoginError] = useState(false)

    
    
    const handleChangeFormValue = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8000/api/auth/login", {
            email: formValues.email,
            password: formValues.password
        }).then(function(response) {
            localStorage.setItem("token", response.data.token)
            navigate("/")
        }).catch(error => {
            setIsLoginError(true)
            setTimeout(() => {
                setIsLoginError(false)
            },2000)
        })
    }

    return(
        <div id="login">
            <div className='container d-flex align-items-center'>
                <form onSubmit={handleSubmit} className='w-100'>
                    <h5 className='text-center'>Bienvenido a Blogs</h5>
                    <div className='d-grid col-5 mx-auto '>
                        <p className='text-center'>Ingresa tus credenciales para acceder a tu cuenta y comenzar a escribir tus pensamientos y experiencias en nuestro blog.</p>
                    </div>

                    { isLoginError ? <Alert mensaje={"Correo o contraseña incorrecta"}/> : null}
                    <div className='d-grid col-4 mx-auto mb-2'>
                            <Input 
                                id={"email"} 
                                placeholder={"Ingresa tu correo"} 
                                type={"text"}
                                value={formValues.email}  
                                change={ handleChangeFormValue }  
                            />
                    </div>
                    <div className='d-grid  col-4 mx-auto mb-2'>
                            <Input 
                                id={"password"} 
                                placeholder={"Contraseña"} 
                                type={"password"}
                                value={formValues.password}
                                change={ handleChangeFormValue }
                            />
                        </div>
                    <p className='text-center'>Si aun no tienes una cuenta registrate <a href='#' onClick={() => navigate("/register")} className='text-primary'>aqui</a></p>
                    <div className="d-grid gap-2 col-4 mx-auto">
                        <button className="btn btn-success" type="submit">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login