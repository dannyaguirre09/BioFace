import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import * as faceapi from 'face-api.js'

const isAuth = () => {
    if (localStorage.getItem('token') !== null) {
        const token = localStorage.getItem('token');
        cargarModelo()
        getUser(token)
        return true
    }
    return false;
};

const cargarModelo = async () => {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    await faceapi.loadTinyFaceDetectorModel(MODEL_URL) //Carga del modelo
}

const getUser = async (idUsuario) => {
    const ruta = "https://localhost:44393/api/Usuario/?idUsuario=" + idUsuario
    await fetch(ruta)
        .then(res => res.json())
        .then(data => {
            sessionStorage.setItem('username', data.UsernameUsuario);
            sessionStorage.setItem('nombre', data.NombreUsuario); 
            sessionStorage.setItem('apellido', data.ApellidoUsuario);
            sessionStorage.setItem('administrador', data.EsAdministrador);             
        })
        .catch(err => {

        })
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuth() ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { message: 'Usuario no autorizado' }
                            }}
                        />

                    )} />
    );
}

export default PrivateRoute;