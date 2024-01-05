import React, { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router";
import axios from "axios";
import Alert from "../components/Alert";

const Register = () => {

    const navigate = useNavigate()


    const [formValues, setFormValues] = useState({
        email: '',
        username: '',
        password: '',
    });

    const [isError, setIsError] = useState(false)

    const handleChangeFormValue = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8000/api/auth/register", {
            email: formValues.email,
            username: formValues.username,
            password: formValues.password
        }).then(function (response) {
            if (!response.status) {
                setIsLoginError(true)
            }
            localStorage.setItem("token", response.data.token)
            navigate("/")
        }).catch(error => {
            console.log("Entro aqui");
            setIsError(true)
            setTimeout(() => {
                setIsError(false)
            }, 2000)
        })
    }

    return (
        <div id="login">
            <div className='container d-flex align-items-center'>
                <form onSubmit={handleSubmit} className='w-100'>
                    <h5 className='text-center'>Bienvenido a Blogs</h5>
                    <div className='d-grid col-5 mx-auto '>
                        <p className='text-center'>Ingresa tus credenciales para acceder a tu cuenta y comenzar a escribir tus pensamientos y experiencias en nuestro blog.</p>
                    </div>
                    {isError ? <Alert mensaje={"El correo ya existe"} />
                        : null}
                    <div className='d-grid col-4 mx-auto mb-2'>
                        <Input
                            id={"email"}
                            placeholder={"Ingresa tu correo"}
                            type={"text"}
                            value={formValues.email}
                            change={handleChangeFormValue}
                        />
                    </div>
                    <div className='d-grid col-4 mx-auto mb-2'>
                        <Input
                            id={"username"}
                            placeholder={"Ingresa tu usuario"}
                            type={"text"}
                            value={formValues.username}
                            change={handleChangeFormValue}
                        />
                    </div>
                    <div className='d-grid  col-4 mx-auto mb-2'>
                        <Input
                            id={"password"}
                            placeholder={"Contraseña"}
                            type={"password"}
                            value={formValues.password}
                            change={handleChangeFormValue}
                        />
                    </div>
                    <p className="text-center">Si ya tienes una cuenta inicia sesion <a href="#" onClick={() => navigate("/login")}>aqui</a></p>
                    <div className="d-grid gap-2 col-4 mx-auto">
                        <button className="btn btn-success" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register