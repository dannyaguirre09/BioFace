import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

class ListaRegistrosComponent extends React.Component {


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

    datos = () => {
        let data = []
        for (let i = 0; i < this.state.listaRegistros.length; i++) {
            data.push(
                {
                    Nombres: this.state.listaRegistros[i].Persona.NombrePersona + ' ' + this.state.listaRegistros[i].Persona.ApellidoPersona,
                    FechaRegistro: this.state.listaRegistros[i].FechaCreacion,
                    HoraRegistro: this.state.listaRegistros[i].FechaModificacion,
                    Tipo: this.state.listaRegistros[i].tipo
                });

        }
        return data;
    }

    exportarExcel = (e) => {
        try {
            if (this.state.listaRegistros.length > 0) {
                const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                const fileExtension = '.xlsx';
                const ws = XLSX.utils.json_to_sheet(this.datos());
                const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
                const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                const data = new Blob([excelBuffer], { type: fileType });
                FileSaver.saveAs(data, 'Reporte_' + this.state.listaRegistros[0].Persona.NombrePersona + this.state.listaRegistros[0].Persona.ApellidoPersona + fileExtension);
            } else {
                this.mensajeError('No hay datos para ser exportados');
            }
        } catch (Exception) {
            this.mensajeError('Error: ' + Exception);
        }

    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    buscarRegistros = async () => {
        const modelo = {
            Persona: {
                IdPersona: this.state.IdPersona
            },
            FechaIngreso: this.state.FechaInicio,
            FechaSalida: this.state.FechaFin
        }

        await fetch('https://localhost:44393/api/Reporte', {
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

    mensajeError = (mensaje) => {
        toast.error(mensaje);
    }

    componentWillMount() {
        const { id_persona } = this.props.match.params
        this.setState({
            IdPersona: id_persona,
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
                                <label style={{ fontSize: '16px' }}>Lista de Registros de {this.state.NombrePersona} {this.state.ApellidoPersona}</label>
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
                                                    <th scope="col">Fecha de Registro</th>
                                                    <th scope="col">Hora de Registro</th>
                                                    <th scope="col">Tipo de Registro</th>
                                                </tr>
                                            </thead>
                                            <tbody className="background">
                                                {
                                                    this.state.listaRegistros.map(lista => {
                                                        return (
                                                            <tr key={lista.IdRegistro}>
                                                                <td>{lista.Persona.NombrePersona} {lista.Persona.ApellidoPersona}</td>
                                                                <td>{lista.FechaCreacion}</td>
                                                                <td>{lista.FechaModificacion}</td>
                                                                <td>{lista.tipo}</td>
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
                                        <Link to={`/reporte_persona/reporte_lineal/${this.state.IdPersona}`} style={{ backgroundColor: '#044F67' }} className="btn btn-block">Regresar</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="col-md-7"></div>
                                <div className="col-md-5">
                                    <button onClick={this.exportarExcel} style={{ background: '#317589' }} className="btn btn-block">Exportar a Excel</button>
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
