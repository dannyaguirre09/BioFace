import React from 'react'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ConfiguracionPerfilComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            IdUsuario: '',
            NombreUsuario: '',
            ApellidoUsuario: '',
            CorreoUsuario: '',
            UsernameUsuario: '',
            EsAdministrador: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.editarUsuario = this.editarUsuario.bind(this);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    editarUsuario = async (e) => {
        e.preventDefault()
        await fetch('https://localhost:44393/api/Usuario', {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data == 1) {
                    this.mensaje('Usuario actualizado correctamente');                  
                } else {
                    this.mensajeError('Ocurrió un problema al actualizar el usuario');                    
                }

            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse a servidor');
            })
    }

    buscarUsuario = async () => {
        const data = localStorage.getItem('token');
        const ruta = "https://localhost:44393/api/Usuario/?idUsuario=" + data
        await fetch(ruta)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    IdUsuario: data.IdUsuario,
                    NombreUsuario: data.NombreUsuario,
                    ApellidoUsuario: data.ApellidoUsuario,
                    UsernameUsuario: data.UsernameUsuario,
                    CorreoUsuario: data.CorreoUsuario,
                    EsAdministrador: data.EsAdministrador
                })
            })
            .catch(err => {
                this.mensaje('No ha sido posible conectarse al servidor')
            })
    }

    componentDidMount() {
        this.buscarUsuario();
    }

    mensaje = (mensajeRecibido) => {
        toast.info(mensajeRecibido)
    }

    mensajeError = (mensajeRecibido) => {
        toast.error(mensajeRecibido)
    }

    render() {
        return (
            <div className="container mx-auto">
                <div className=" col-lg-2"> </div>
                <div className=" col-lg-10 panel-body">
                    <div className="container">
                        <div className="col-md-1"></div>
                        <div className="row">
                            <div className="col-md-7 ">
                                <div className="panel panel-default mx-auto">
                                    <div className="panel-heading">
                                        <h5 style={{ fontSize: '16px' }} className="panel-title text-center">Perfil</h5>
                                    </div>
                                    <div className="panel-body">
                                        <ToastContainer></ToastContainer>
                                        <form onSubmit={this.editarUsuario}>
                                            <div className="form-group ">
                                                <label>Nombre </label>
                                                <input value={this.state.NombreUsuario}
                                                    required type="text" className="form-control"
                                                    name="NombreUsuario" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Apellido </label>
                                                <input required type="text" value={this.state.ApellidoUsuario}
                                                    className="form-control"
                                                    name="ApellidoUsuario" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Correo electrónico</label>
                                                <input value={this.state.CorreoUsuario}
                                                    required type="email" className="form-control"
                                                    name="CorreoUsuario" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input value={this.state.UsernameUsuario}
                                                    required type="text" className="form-control"
                                                    name="UsernameUsuario" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <Link to="/actualizar_password">Cambiar Contraseña</Link>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" style={{ backgroundColor: '#044F67' }} className="btn btn-block" to="/">Editar Perfil</button>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ConfiguracionPerfilComponent)
