import React from 'react'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CrearUsuarioComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            NombreUsuario: "",
            ApellidoUsuario: "",
            CorreoUsuario: "",
            UsernameUsuario: "",
            PasswordUsuario: "",
            ConfirmacionPasswordUsuario: "",
            EsAdministrador: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.agregarUsuario = this.agregarUsuario.bind(this);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    toggleChange = () => {
        var c = () => Array.from(document.getElementsByTagName("INPUT")).filter(cur => cur.type === 'checkbox' && cur.checked).length > 0;
        if (!c()) {
            this.setState({
                EsAdministrador: false
            })
        } else {
            this.setState({
                EsAdministrador: true
            })
        }
    }

    comprobarClaves() {
        const valor1 = this.state.PasswordUsuario;
        const valor2 = this.state.ConfirmacionPasswordUsuario;

        if (valor1 == valor2)
            return true;
        else
            return false;
    }

    agregarUsuario = async (e) => {
        e.preventDefault();
        if (this.comprobarClaves()) {
            await fetch('https://localhost:44393/api/Usuario', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data === 1) {
                        this.mensaje("Usuario creado correctamente");
                        this.props.history.push('/lista_usuarios')
                    } else {
                        this.mensajeError("Ocurrió un problema al crear el usuario");
                        this.props.history.push('/lista_usuarios')
                    }
                })
                .catch(err => {
                    this.mensajeError("No ha sido posible conectarse al servidor");
                    this.props.history.push('/lista_usuarios')
                })
        } else {
            alert('Las contraseñas no coinciden')
            this.setState({
                PasswordUsuario: '',
                ConfirmacionPasswordUsuario: ''
            })
        }
    }

    mensaje = (mensaje) => {
        toast.info(mensaje);
    }

    mensajeError = (mensaje) => {
        toast.error(mensaje);
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
                                        <h5 style={{ fontSize: '16px' }} className="panel-title text-center">Ingresar Usuario</h5>
                                    </div>
                                    <div className="panel-body">
                                        <form onSubmit={this.agregarUsuario}>
                                            <div className="form-group ">
                                                <label>Nombre </label>
                                                <input required type="text" className="form-control"
                                                    name="NombreUsuario" autoComplete="off" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Apellido </label>
                                                <input required type="text" className="form-control"
                                                    name="ApellidoUsuario" autoComplete="off" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Correo electrónico</label>
                                                <input required type="email" className="form-control"
                                                    name="CorreoUsuario" autoComplete="off" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input required type="text" className="form-control"
                                                    name="UsernameUsuario" autoComplete="off" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input required type="password" className="form-control" value={this.state.PasswordUsuario}
                                                    name="PasswordUsuario"  autoComplete="off" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Confirmar Password</label>
                                                <input  required type="password" className="form-control" value={this.state.ConfirmacionPasswordUsuario}
                                                    name="ConfirmacionPasswordUsuario" autoComplete="off"   onChange={(this.handleChange)} />
                                            </div>

                                            <div className="form-group">
                                                <label className="checkbox">
                                                    <input type="checkbox" onChange={this.toggleChange} /> Asignar permisos de administrador
                                            </label>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <button type="submit" style={{ backgroundColor: '#044F67' }} className="btn btn-block">Guardar</button>
                                                </div>
                                                <div className="col-md-6">
                                                    <Link to={'/lista_usuarios'} style={{ backgroundColor: '#044F67' }} className="btn btn-block">Cancelar</Link>
                                                </div>
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

export default withRouter(CrearUsuarioComponent)
