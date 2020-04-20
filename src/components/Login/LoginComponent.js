import React from 'react'
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class LoginComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            UsernameUsuario: "",
            PasswordUsuario: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.iniciarSesion = this.iniciarSesion.bind(this);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    iniciarSesion = async (e) => {
        e.preventDefault()
        await fetch('https://localhost:44393/api/Login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data === 0) {
                    this.mensaje('No existe un usuario con los datos ingresados');
                    this.setState({UsernameUsuario: '', PasswordUsuario: ''})
                } else {                 
                    localStorage.setItem('token', data)
                    this.props.history.push('/')
                    return;
                }
            })
            .catch(err => {
                this.mensaje('No ha sido posible conectarse al servidor');
            })
    }

    mensaje = (mensaje) => {
        toast.error(mensaje)
    }

    render() {
        return (        
            <div className="root" style={{background: '#003057'}}>                             
                <form onSubmit={this.iniciarSesion} className="form-signin" role="form" action="index.html">
                    <h3 className="form-signin-heading"><img src = {process.env.PUBLIC_URL + 'dist/img/LogoBioFaceHorizontal.png'} height="202" width="360" ></img></h3>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-addon">
                                <i className="glyphicon glyphicon-user"></i>
                            </div>
                            <input type="text" className="form-control"
                                onChange={this.handleChange} required value={this.state.UsernameUsuario}
                                name="UsernameUsuario" id="username" placeholder="Nombre de Usuario" autoComplete="off" />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-addon">
                                <i className=" glyphicon glyphicon-lock "></i>
                            </div>
                            <input type="password" className="form-control"
                                onChange={this.handleChange} required value={this.state.PasswordUsuario}
                                name="PasswordUsuario" id="password" placeholder="Contraseña" autoComplete="off" />
                        </div>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Iniciar Sesión</button>
                    <br></br>
                    <br></br><br></br><br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginComponent)