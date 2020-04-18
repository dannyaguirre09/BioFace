import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class ListaRegistrosComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            ListaIngreso: [],
            ListaSalida: [],
            HoraIngreso: []
        }
    }


    formatearHora(horaRegistro) {
        const hora = new Date(horaRegistro)
        const opcionesHora = { hour: 'numeric', minute: 'numeric' };
        return new Intl.DateTimeFormat('es-EC', opcionesHora).format(hora)
    }

    formatearFecha(fechaRegistro) {
        const fecha = new Date(fechaRegistro);
        var opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('es-EC', opcionesFecha).format(fecha)
    }

    obtenerListaIngreso = async () => {
        const ruta = "https://localhost:44393/api/RegistroIngreso"
        await fetch(ruta)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    ListaIngreso: data
                })
            })
    }

    obtenerListaSalida = async () => {
        const ruta = "https://localhost:44393/api/RegistroSalida"
        await fetch(ruta)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    ListaSalida: data
                })
            })
    }

    componentDidMount() {
        this.obtenerListaIngreso()
        this.obtenerListaSalida()
    }

    render() {
        return (
            <div className="container mx-auto">
                <div className=" col-sm-2"></div>
                <div className=" col-sm-10 panel-body">
                    <div className="container">

                        <div className="row">
                            <div className="col-md-9 text-center">
                                <label style={{ fontSize: '20px' }}>Lista de Registros</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-3"></div>
                            <div className="col-md-4">
                                <div className="col-md-6">
                                    <Link to={"/reconocimiento_ingreso"} style={{ background: '#4B77BE' }}
                                        className="btn btn-block">Registrar Ingreso</Link>
                                </div>
                                <div className="col-md-6">
                                    <Link to={"/reconocimiento_salida"} style={{ background: '#317589' }}
                                        className="btn btn-block">Registrar Salida</Link>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10">
                                <label style={{ fontSize: '16px' }}>Registros de Ingreso</label>
                                <br /><br />
                                <div className="panel panel-default">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Apellido</th>
                                                <th scope="col">Cédula</th>
                                                <th scope="col">Hora de Ingreso</th>
                                                <th scope="col">Fecha de Ingreso</th>
                                            </tr>
                                        </thead>
                                        <tbody className="background">
                                            {
                                                this.state.ListaIngreso.map(lista => {
                                                    return (
                                                        <tr key={lista.IdRegistro}>
                                                            <td>{lista.Persona.NombrePersona}</td>
                                                            <td>{lista.Persona.ApellidoPersona}</td>
                                                            <td>{lista.Persona.CedulaPersona}</td>
                                                            <td>{this.formatearHora(lista.HoraIngreso)}</td>
                                                            <td>{this.formatearFecha(lista.FechaIngreso)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10">
                            <label style={{ fontSize: '16px' }}>Registros de Salida</label>
                                <br /><br />
                                <div className="panel panel-default">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Apellido</th>
                                                <th scope="col">Cédula</th>
                                                <th scope="col">Hora de Salida</th>
                                                <th scope="col" >Fecha de Salida</th>
                                            </tr>
                                        </thead>
                                        <tbody className="background">
                                            {
                                                this.state.ListaSalida.map(lista => {
                                                    return (
                                                        <tr key={lista.IdRegistro}>
                                                            <td>{lista.Persona.NombrePersona}</td>
                                                            <td>{lista.Persona.ApellidoPersona}</td>
                                                            <td>{lista.Persona.CedulaPersona}</td>
                                                            <td>{this.formatearHora(lista.HoraSalida)}</td>
                                                            <td>{this.formatearFecha(lista.FechaSalida)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ListaRegistrosComponent)