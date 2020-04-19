import React from 'react'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ActualizarUsuarioComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            IdUsuario: ' ',
            NombreUsuario: ' ',
            ApellidoUsuario: ' ',
            CorreoUsuario: ' ',
            EsAdministrador: false,
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

    editarUsuario = async (e) => {
        e.preventDefault()
        let res = await fetch('https://localhost:44393/api/Usuario', {
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
                    this.props.history.push('/lista_usuarios');
                    this.mensaje('Usuario actualizado correctamente');
                } else {                    
                    this.props.history.push('/lista_usuarios');
                    this.mensajeError('Ocurrió un problema al actualizar el usuario');
                }

            })
            .catch(err => {                
                this.mensajeError('No ha sido posible conectarse a servidor');
            })
    }

    buscarUsuario = async () => {
        const { id_usuario } = this.props.match.params
        const uri = "https://localhost:44393/api/Usuario/?idUsuario=" + id_usuario
        await fetch(uri)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    NombreUsuario: data.NombreUsuario,
                    ApellidoUsuario: data.ApellidoUsuario,
                    CorreoUsuario: data.CorreoUsuario,
                    EsAdministrador: data.EsAdministrador,
                })
            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse a servidor');
            })
    }

    componentDidMount() {
        this.buscarUsuario()
        const { id_usuario } = this.props.match.params
        this.setState({
            IdUsuario: id_usuario,
            EsAdministrador: false
        })
    }

    mensaje = (mensaje) => {
        toast.info(mensaje);
    }

    mensajeError = (mensaje) => {
        toast.error(mensaje);
    }

    render() {
        if (this.state.EsAdministrador) {
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

                                                <br></br>
                                                <div className="form-group">
                                                    <label className="checkbox">
                                                        <input type="checkbox" checked
                                                            onChange={this.toggleChange} /> Asignar permisos de administrador
                                                </label>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <button type="submit" style={{ backgroundColor: '#044F67' }} className="btn btn-block">Editar</button>
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
        } else {
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
                                                <br></br>
                                                    <div className="form-group">
                                                    <label className="checkbox">
                                                            <input  type="checkbox"
                                                                onChange={this.toggleChange} />
                                                                Asignar permisos de administrador</label>
                                                    </div>



                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <button type="submit" style={{ backgroundColor: '#044F67' }} className="btn btn-block">Editar</button>
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

}

export default withRouter(ActualizarUsuarioComponent)