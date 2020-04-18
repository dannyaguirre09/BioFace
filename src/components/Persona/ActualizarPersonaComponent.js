import React from 'react'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ActualizarPersonaComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            IdPersona: '',
            NombrePersona: "",
            ApellidoPersona: "",
            DireccionPersona: "",
            CorreoPersona: "",
            CedulaPersona: "",
            FechaNacimiento: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.editarPersona = this.editarPersona.bind(this);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    editarPersona = async (e) => {
        e.preventDefault()
        let res = await fetch('https://localhost:44393/api/Persona', {
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
                    this.mensaje(1);
                    this.props.history.push('/lista_personas')
                } else {
                    this.mensaje(3);
                    this.props.history.push('/lista_personas')
                }
            })
            .catch(err => {
                this.mensaje(4)
                this.props.history.push('/lista_personas')
            })
    }

    buscarPersona = async () => {
        const { id_persona } = this.props.match.params
        const uri = "https://localhost:44393/api/Persona/?idPersona=" + id_persona
        await fetch(uri)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    NombrePersona: data.NombrePersona,
                    ApellidoPersona: data.ApellidoPersona,
                    DireccionPersona: data.DireccionPersona,
                    CorreoPersona: data.CorreoPersona,
                    CedulaPersona: data.CedulaPersona,
                    FechaNacimiento: this.formatearFecha(data.FechaNacimiento)
                })
            })
            .catch(err => {
                this.mensaje(4)
                this.props.history.push('/lista_personas')
            })
    }

    formatearFecha(fecha) {
        const fechaFormato = new Date(fecha);
        var opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const fechaFormateda = new Intl.DateTimeFormat('ko-KR', opcionesFecha).format(fechaFormato)
        var cadena1 = fechaFormateda.replace(". ", "-")
        var cadena2 = cadena1.replace(". ", "-")
        var cadena3 = cadena2.replace(".", "")
        return cadena3
    }

    componentDidMount() {
        this.buscarPersona()
        const { id_persona } = this.props.match.params
        this.setState({
            IdPersona: id_persona
        })
    }

    mensaje = (estado) => {
        if (estado == 1)
          toast.info("Registro editado correctamente!")
        else if (estado == 2)
          toast.error("Ocurrio un problema al buscar el registro!")
        else if (estado == 3)
          toast.error("Ocurrio un problema al editar el registro!")
         else 
         toast.error("Ocurrio un problema al conectarse con el servidor")
      };

    render() {
        return (
            <div className="container mx-auto">
                <div className=" col-lg-2">

                </div>
                <div className=" col-lg-10 panel-body">

                    <div className="container">
                        <div className="col-md-1"></div>
                        <div className="row">
                       
                            <div className="col-md-7 ">
                                <div className="panel panel-default mx-auto">
                                    <div className="panel-heading">
                                        <h5 style={{ fontSize: '16px' }} className="panel-title text-center">Editar Persona</h5>
                                    </div>
                                    <div className="panel-body">
                                        <form onSubmit={this.editarPersona}>
                                            <div className="form-group ">
                                                <label>Nombre de la persona</label>
                                                <input value={this.state.NombrePersona}
                                                    required type="text" className="form-control"
                                                    name="NombrePersona" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Apellido de la persona</label>
                                                <input value={this.state.ApellidoPersona}
                                                    required type="text" className="form-control"
                                                    name="ApellidoPersona" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Cédula de la persona</label>
                                                <input value={this.state.CedulaPersona}
                                                    required type="text" className="form-control"
                                                    name="CedulaPersona" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Dirección de la persona</label>
                                                <input value={this.state.DireccionPersona}
                                                    required type="text" className="form-control"
                                                    name="DireccionPersona" onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Correo electrónico</label>
                                                <input value={this.state.CorreoPersona}
                                                    required type="email" className="form-control"
                                                    name="CorreoPersona" onChange={this.handleChange} />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Fecha de nacimiento</label>
                                                        <input value={this.state.FechaNacimiento}
                                                            required type="Date" className="form-control"
                                                            name="FechaNacimiento" onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group ">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <button type="submit" style={{ backgroundColor: '#044F67' }} className="btn btn-block">Editar</button>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Link to={`/confirmacion_eliminar_persona/${this.state.IdPersona}`} style={{ backgroundColor: '#C3272B' }} className="btn btn-block">Eliminar</Link>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Link to={'/lista_personas'} style={{ backgroundColor: '#044F67' }} className="btn btn-block">Cancelar</Link>
                                                    </div>
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

export default withRouter(ActualizarPersonaComponent)