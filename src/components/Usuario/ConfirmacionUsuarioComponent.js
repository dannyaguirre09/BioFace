import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ConfirmacionUsuarioComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            IdUsuario: '',
            NombreUsuario: '',
            ApellidoUsuario: ''
        }
    }

    eliminarUsuario = async () => {
        const uri = "https://localhost:44393/api/Usuario/?idUsuario=" + this.state.IdUsuario
        await fetch(uri, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data === 1 ){
                    this.mensaje('Usuario eliminado correctamente');
                    this.props.history.push('/lista_usuarios')
                } else {
                    this.mensajeError('Ocurrió un problema al eliminar el usuario');
                    this.props.history.push('/lista_usuarios')
                }
            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor');
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
                    IdUsuario: data.IdUsuario
                })
            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor');
            })
    }

    componentWillMount() {
        this.buscarUsuario()
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
                <div className=" col-lg-2"></div>
                <div className=" col-lg-10 panel-body">
                    <div className="container">
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="row">
                            <div className="col-md-10">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <label style={{ fontSize: '30px' }} className="panel-title">¿Está seguro que desea eliminar el usuario {this.state.NombreUsuario} {this.state.ApellidoUsuario}?</label>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <button onClick={this.eliminarUsuario} style={{ backgroundColor: '#C3272B' }} className="btn btn-block">Eliminar</button>
                                            </div>
                                            <div className="col-md-2">
                                                <Link to = {'/lista_usuarios'} style={{ background: '#317589' }} className="btn btn-block">Cancelar</Link>
                                            </div>
                                        </div>
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

export default withRouter(ConfirmacionUsuarioComponent)