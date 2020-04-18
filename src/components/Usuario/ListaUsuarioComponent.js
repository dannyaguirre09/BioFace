import React from 'react'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class ListaUsarioComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            buscar: '',
            listaUsuarios: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.obtenerUsuarios()
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    buscarUsuario = async () => {
        const ruta = "https://localhost:44393/api/Usuario/?nombreUsuario=" + this.state.buscar
        await fetch(ruta)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    listaUsuarios: data
                })
            })
            .catch(err => {
                this.mensajeError("No ha sido posible conectarse al servidor");
            })
    }

    obtenerUsuarios = async () => {
        await fetch('https://localhost:44393/api/Usuario')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    listaUsuarios: data
                })
            })
            .catch(err => {
                this.mensajeError("No ha sido posible conectarse al servidor")
            })
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
                <div className=" col-sm-2"></div>
                <div className=" col-sm-10 panel-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9 text-center">
                                <label style={{ fontSize: '16px' }}>Lista de Usuarios</label>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <ToastContainer></ToastContainer>
                            <div className="col-md-7">
                                <input name="buscar" className="form-control"
                                    type="text" onChange={this.handleChange} />
                            </div>
                            <div className="col-md-3">
                                <input style={{ backgroundColor: '#044F67' }} value="Buscar Usuario"
                                    onClick={this.buscarUsuario} className="btn" type="button" />
                            </div>
                        </div>
                        <br /><br /><br />
                        <div className="row">
                            <div className="col-md-2">
                                <Link to={"/crear_usuario"} style={{ backgroundColor: '#044F67' }} className="btn btn-block"
                                >Crear Usuario</Link>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-10 mx-auto ">
                                <div className="panel panel-default">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Apellido</th>
                                                <th scope="col">Username</th>
                                                <th scope="col">Correo</th>
                                                <th scope="col" style={{ textAlign: 'center' }}>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="background">
                                            {
                                                this.state.listaUsuarios.map(lista => {
                                                    return (
                                                        <tr key={lista.IdUsuario}>
                                                            <td>{lista.NombreUsuario}</td>
                                                            <td>{lista.ApellidoUsuario}</td>
                                                            <td>{lista.UsernameUsuario}</td>
                                                            <td>{lista.CorreoUsuario}</td>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <Link to={`/actualizar_usuario/${lista.IdUsuario}`}
                                                                            style={{ background: '#4B77BE' }}
                                                                            className="btn btn-block"> Editar</Link>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <Link to={`/confirmacion_eliminar_usuario/${lista.IdUsuario}`}
                                                                            style={{ background: '#317589' }}
                                                                            className="btn btn-block"> Eliminar</Link>
                                                                    </div>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <br/><br/><br/>
                        <div className="row">
                            <div className="col-md-2 ">
                                <Link to={'\configuracion'} style={{ backgroundColor: '#044F67' }} className="btn btn-block">Regresar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ListaUsarioComponent)