import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class EliminarRegistroComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            IdPersona: '',
            NombrePersona: '',
            ApellidoPersona: '',
            FechaInicio: '',
            FechaFin: '',
            listaRegistros: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    formatearHoraRegistro(horaRegistro) {
        const hora = new Date(horaRegistro)
        const opcionesHora = { hour: 'numeric', minute: 'numeric' };
        let horaActual = new Intl.DateTimeFormat('es-EC', opcionesHora).format(hora)
        return horaActual
    }

    formatearFechaRegistro(fechaRegistro) {
        const fecha = new Date(fechaRegistro);
        var opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let fechaActual = new Intl.DateTimeFormat('es-EC', opcionesFecha).format(fecha)
        return fechaActual
    }

    formatearFecha() {
        const fechaFormato = new Date();
        var opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const fechaFormateda = new Intl.DateTimeFormat('ko-KR', opcionesFecha).format(fechaFormato)
        var cadena1 = fechaFormateda.replace(". ", "-")
        var cadena2 = cadena1.replace(". ", "-")
        var cadena3 = cadena2.replace(".", "")
        return cadena3
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    buscarRegistros = async () => {
        console.log(this.state)
        const modelo = {
            Persona: {
                IdPersona: this.state.IdPersona
            },
            FechaIngreso: this.state.FechaInicio,
            FechaSalida: this.state.FechaFin
        }

        await fetch('https://localhost:44393/api/ReporteGeneral', {
            method: 'POST',
            body: JSON.stringify(modelo),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({
                        NombrePersona: data[0].Persona.NombrePersona,
                        ApellidoPersona: data[0].Persona.ApellidoPersona
                    })
                }

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
                    listaRegistros: data
                })

            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
    }

    eliminarRegistro = async (idRegistro) => {
        const uri = 'https://localhost:44393/api/RegistroIngreso?idRegistro=' + idRegistro
        await fetch(uri, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data === 1) {
                    this.mensaje("Registro eliminado correctamente")
                    this.buscarRegistros();
                } else {
                    this.mensajeError("Ocurrió un problema al eliminar el registro");
                }
            })
            .catch(err => {
                this.mensajeError("No ha sido posible conectarse con el servidor");
            })
    }

    mensaje = (mensaje) => {
        toast.info(mensaje);
    }

    mensajeError = (mensaje) => {
        toast.error(mensaje);
    }

    componentWillMount() {
        this.setState({
            FechaInicio: '2020-01-01',
            FechaFin: this.formatearFecha()
        })
    }

    componentDidMount() {
        this.buscarRegistros()
    }

    render() {
        return (
            <div className="container mx-auto">
                <div className=" col-sm-2"></div>
                <div className=" col-sm-10 panel-body">
                    <div className="container">
                        <ToastContainer></ToastContainer>
                        <div className="row">
                            <div className="col-md-9 text-center">
                                <label style={{ fontSize: '16px' }}>Lista de Registros</label>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-3">
                                <input name="FechaInicio" step="1" required value={this.state.FechaInicio} className="form-control"
                                    onChange={this.handleChange} type="date" />
                            </div>
                            <div className="col-md-3">
                                <input name="FechaFin" step="1" value={this.state.FechaFin} className="form-control"
                                    onChange={this.handleChange} type="date" required />
                            </div>
                            <div className="col-md-3">
                                <button onClick={this.buscarRegistros} style={{ backgroundColor: '#044F67' }} type="submit"
                                    className="btn"  >Buscar Registros</button>
                            </div>
                        </div>
                        <br /><br /><br />
                        <div className="row">
                            <div className="col-md-10 mx-auto ">
                                <div className="panel panel-default">
                                    <div style={{ display: 'block' }, { position: 'relative', height: '388px', overflow: 'auto' }} >
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nombres</th>
                                                    <th scope="col">Fecha | Hora de Registro </th>
                                                    <th scope="col">Tipo de registro</th>
                                                    <th scope="col">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="background">
                                                {
                                                    this.state.listaRegistros.map(lista => {
                                                        return (
                                                            <tr key={lista.IdRegistro}>
                                                                <td>{lista.Persona.NombrePersona} {lista.Persona.ApellidoPersona}</td>
                                                                <td>{lista.FechaCreacion} | {lista.FechaModificacion}</td>
                                                                <td>{lista.tipo}</td>
                                                                <td>
                                                                    <button onClick={() => this.eliminarRegistro(lista.IdRegistro)} className="btn btn-block" style={{ backgroundColor: '#C3272B' }}>Eliminar</button>
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
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <div className="col-md-5">
                                    <div className="row">
                                        <Link to={'/configuracion'} style={{ backgroundColor: '#044F67' }} className="btn btn-block">Regresar</Link>
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

export default withRouter(EliminarRegistroComponent)