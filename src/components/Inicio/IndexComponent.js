import React from 'react'
import { withRouter } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class IndexComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            NumeroPersonasEliminadas: '',
            NumeroUsuarios: '',
            NumeroPersonas: '',
            FechaActual: '',
            NombreUsuario: sessionStorage.getItem('nombre'),
            ApellidoUsuario: sessionStorage.getItem('apellido'),
            ListaRegistros: []
        }
    }

    formatearHoraRegistro(horaRegistro) {
        const hora = new Date(horaRegistro)
        const opcionesHora = { hour: 'numeric', minute: 'numeric' };
        let horaActual = new Intl.DateTimeFormat('es-EC', opcionesHora).format(hora)
        return horaActual
    }

    formatearFechaRegistro(fechaRegistro) {
        const fecha = new Date(fechaRegistro);
        var opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
        let fechaActual = new Intl.DateTimeFormat('es-EC', opcionesFecha).format(fecha)
        return fechaActual
    }

    buscarUsuario = async () => {
        const data = localStorage.getItem('token');
        const ruta = "https://localhost:44393/api/Usuario/?idUsuario=" + data
        await fetch(ruta)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    NombreUsuario: data.NombreUsuario,
                    ApellidoUsuario: data.ApellidoUsuario
                })
            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
    }

    buscarRegistros = async () => {
        const ruta = "https://localhost:44393/api/Inicio"
        await fetch(ruta)
            .then(res => res.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].tipo == 0) {
                        data[i].tipo = 'Salida'
                        data[i].FechaCreacion = this.formatearFechaRegistro(data[i].FechaSalida)
                        data[i].FechaModificacion = this.formatearHoraRegistro(data[i].HoraSalida)
                    } else {
                        data[i].tipo = 'Entrada'
                        data[i].FechaCreacion = this.formatearFechaRegistro(data[i].FechaIngreso)
                        data[i].FechaModificacion = this.formatearHoraRegistro(data[i].HoraIngreso)
                    }
                }

                this.setState({
                    ListaRegistros: data
                })
            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
    }

    buscarNumeroPersonas = async () => {
        const ruta = "https://localhost:44393/api/Inicio?creacion=1"
        await fetch(ruta)
            .then(res => res.json())
            .then(data => {
                if (data == -1) {
                    this.mensajeError('Ocurrió un problema al buscar el número de personas creadas')
                } else {
                    this.setState({NumeroPersonas: data})
                } 

            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
    }

    buscarNumeroPersonasEliminadas = async () => {
        const ruta = "https://localhost:44393/api/Inicio?creacion=0"
        await fetch(ruta)
            .then(res => res.json())
            .then(data => {
                if (data == -1) {
                    this.mensajeError('Ocurrió un problema al buscar el número de personas creadas')
                } else {
                    this.setState({NumeroPersonasEliminadas: data})
                } 

            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
    }

    buscarNumeroUsuarios = async () => {
        const ruta = "https://localhost:44393/api/Inicio?fechaActual=1"
        await fetch(ruta)
            .then(res => res.json())
            .then(data => {
                if (data == -1) {
                    this.mensajeError('Ocurrió un problema al buscar el número de usuarios creados')
                } else {
                    this.setState({NumeroUsuarios: data})
                } 

            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
    }

    mensajeError = (mensaje) => {
        toast.error(mensaje);
    }

    componentDidMount() {
        const fecha = new Date()
        var opcionesFecha = { year: 'numeric', month: 'numeric', day: 'numeric' };
        let fechaActual = new Intl.DateTimeFormat('es-EC', opcionesFecha).format(fecha)
        this.setState({ FechaActual: fechaActual })

        if (this.state.NombreUsuario == null)
            this.buscarUsuario()
        this.buscarRegistros();
        this.buscarNumeroPersonas();
        this.buscarNumeroUsuarios();
        this.buscarNumeroPersonasEliminadas();
    }

    render() {
        return (
            <div className="container mx-auto">
                <div className=" col-sm-2"></div>
                <div className=" col-sm-9 panel-body">
                    <div className="container">
                        <div className="content-row">
                            <h2 className="content-row-title">Inicio</h2>
                            <div className="row">
                                <ToastContainer></ToastContainer>
                                <div className="col-md-10">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Bienvenido <b>{this.state.NombreUsuario}</b>, a BioFace</h3>
                                        </div>
                                        <div className="panel-body">
                                            <p>Este es el sistema Reconocimiento facial diseñado para automatizar el proceso de registro y salida del personal. Desde este espacio puedes:</p>
                                            <ul>
                                                <li>Ingresar nuevos registros de empleados.</li>
                                                <li>Ingresar nuevos asociados como administradores.</li>
                                                <li>Editar los detalles de una registro.</li>
                                                <li>Cambiar el estado de un registro.</li>
                                                <li>Revisar reportes de ingreso y salida del personal.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="content-row">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Top 5 últimas personas registradas</h3>
                                        </div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Apellido</th>
                                                    <th>fecha y hora del registro</th>
                                                    <th>Tipo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.ListaRegistros.map(lista => {
                                                        return (
                                                            <tr key={lista.IdRegistro}>
                                                                <td>{lista.Persona.NombrePersona}</td>
                                                                <td>{lista.Persona.ApellidoPersona}</td>
                                                                <td>{lista.FechaCreacion} | {lista.FechaModificacion}</td>
                                                                <td>{lista.tipo}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                                <div className="col-md-4">

                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Resumen al {this.state.FechaActual}</h3>
                                        </div>
                                        <div className="panel-body">
                                            <p>Al día de hoy:</p>
                                            <ul>
                                                <li>{this.state.NumeroPersonas} personas registradas en BioFace.</li>
                                                <li>{this.state.NumeroPersonasEliminadas} personas eliminadas.</li>
                                                <li>{this.state.NumeroUsuarios} usuarios registrados el día de hoy.</li>                                                
                                            </ul>
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
export default withRouter(IndexComponent)


