import React from 'react'
import { withRouter } from 'react-router'

class DespedidaPersonaComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            NombrePersona: '',
            ApellidoPersona: '',
            ImagenPersona: '',
            HoraSalida: '',
            FechaSalida: '',
            tiempo: ''
        }
    }

    buscarImagen = async () => {
        const { id_persona } = this.props.match.params
        const uri = "https://localhost:44393/api/Imagen?idPersonaImagen=" + id_persona
        await fetch(uri)
                .then(res => res.json())
                .then(data => {
                    this.setState({ImagenPersona: data.ImagenPersona})
                })
    }

    buscarPersona = async () => {
        const { id_persona } = this.props.match.params
        const uri = "https://localhost:44393/api/RegistroSalida/?idPersona=" + id_persona
        await fetch(uri)
            .then(res => res.json())
            .then(data => {
                const fecha = new Date(data.FechaSalida);
                const hora = new Date(data.HoraSalida);
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var optionsHora = { hour: 'numeric', minute: 'numeric'};
                const fechaFormateada = new Intl.DateTimeFormat('es-EC', options).format(fecha)
                const HoraFormateada = new Intl.DateTimeFormat('es-EC', optionsHora).format(hora)
                this.setState({
                    NombrePersona: data.Persona.NombrePersona,
                    ApellidoPersona: data.Persona.ApellidoPersona,
                    HoraSalida: ' ' + HoraFormateada,
                    FechaSalida: ' ' +  fechaFormateada
                })

                this.intervalo()
            })
    }

    intervalo() {
        let cronometro = 11
        const processFace = () => {
            cronometro = cronometro - 1
            this.setState({
                tiempo: cronometro
            })
            if (cronometro === 0) {
                this.props.history.push('/lista_registros')
                clearInterval(interval);
            }
        }

         const interval = setInterval(processFace, 1000)
    }

    componentDidMount = async () => {
        await this.buscarImagen()
        await this.buscarPersona()
    }

    render() {
        return (
            <div className="container mx-auto">
                <div className=" col-sm-2"></div>
                <div className=" col-sm-10 panel-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9 text-center">
                            <div className="row">
                                    <label style={{ fontSize: '25px' }}>Hasta luego, {this.state.NombrePersona} {this.state.ApellidoPersona}</label>
                                </div>
                                <br />
                                <div className="row">
                                    <img className="w-100 h-100 img-thumbnail" src={`data:image/png;base64,${this.state.ImagenPersona}`}
                                         id="photo" name="ImagenPersona" />
                                </div>
                                <br />
                                <div className="row">
                                    <label style={{ fontSize: '25px' }}>Hora de Registro:
                                    {this.state.HoraSalida}
                                    </label>
                                </div>
                                <div className="row">
                                    <label style={{ fontSize: '25px' }}> Fecha de Registro: {this.state.FechaSalida}</label>
                                </div>
                                <div className="row">
                                    <label style={{ fontSize: '25px' }}> {this.state.tiempo} </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(DespedidaPersonaComponent)
