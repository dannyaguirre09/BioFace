import React from 'react'
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ActualizarPassComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            ContraseñaAnterior: '',
            ContraseñaNueva: '',
            ConfirmacionContraseña: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.editarUsuario = this.editarUsuario.bind(this);
    }

    editarUsuario = async (e) => {
        e.preventDefault()
        const data = localStorage.getItem('token');
        let confirmacion = this.state.ConfirmacionContraseña;
        let modelo = { IdUsuario: data, PasswordUsuario: this.state.ContraseñaNueva }
        if (confirmacion == modelo.PasswordUsuario) {
            await fetch('https://localhost:44393/api/Login', {
                method: 'PUT',
                body: JSON.stringify(modelo),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data == 1) {
                        this.mensaje('Password actualizado correctamente');
                    } else {
                        this.mensajeError('Ocurrió un problema al actualizar el password');
                    }

                })
                .catch(err => {
                    this.mensajeError('No ha sido posible conectarse a servidor');
                })
        } else {
            alert('Las contraseñas no coinciden')
            this.setState({ ContraseñaNueva: '', ConfirmacionContraseña: '' })
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
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
                                        <h5 style={{ fontSize: '16px' }} className="panel-title text-center">Actualizar Contraseña</h5>
                                    </div>
                                    <div className="panel-body">
                                        <form onSubmit={this.editarUsuario}>
                                            <div className="form-group ">
                                                <label>Contraseña Anterior </label>
                                                <input
                                                    required type="password" className="form-control"
                                                    id="ContraseñaAnterior" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Constraseña Nueva </label>
                                                <input required type="password"
                                                    className="form-control" value={this.state.ContraseñaNueva}
                                                    name="ContraseñaNueva" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Confirmar Contraseña nueva</label>
                                                <input
                                                    required type="password" className="form-control" value={this.state.ConfirmacionContraseña}
                                                    name="ConfirmacionContraseña" onChange={this.handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <button type="submit" style={{ backgroundColor: '#044F67' }} className="btn btn-block" >Actualizar</button>
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

export default withRouter(ActualizarPassComponent)
