import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ConfirmacionComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            IdPersona: '',
            NombrePersona: '',
            ApellidoPersona: ''
        }
    }

    eliminarPersona = async () => {
        const uri = "https://localhost:44393/api/Persona/?idPersona=" + this.state.IdPersona
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
                    this.mensaje(1);
                    this.props.history.push('/lista_personas')
                } else {
                    this.mensaje(2);
                    this.props.history.push('/lista_personas')
                }
            })
            .catch(err => {
                this.mensaje(3);
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
                    IdPersona: data.IdPersona
                })
            })
            .catch(err => {
                this.mensaje(3);
                this.props.history.push('/lista_personas')
            })
    }

    componentWillMount() {
        this.buscarPersona()
    }

    mensaje = (estado) => {
        if (estado === 1)
          toast.info("Registro eliminado correctamente!")
        else if (estado === 2)
          toast.error("Ocurrio un problema al eliminar el registro!")  
        else 
         toast.error("Ocurrio un problema al conectarse con el servidor!") 
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
                                        <label style={{ fontSize: '30px' }} className="panel-title">¿Está seguro que desea eliminar el registro {this.state.NombrePersona} {this.state.ApellidoPersona}?</label>
                                    </div>
                                    <div className="panel-body">
                                        <p style={{ fontSize: '17px' }}>Se eliminarán todas las imágenes asociadas a esta persona:</p>
                                        <br></br>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <button onClick={this.eliminarPersona} style={{ backgroundColor: '#C3272B' }} className="btn btn-block">Eliminar</button>
                                            </div>
                                            <div className="col-md-2">
                                                <Link to = {`/actualizar_persona/${this.state.IdPersona}`} style={{ background: '#317589' }} className="btn btn-block">Cancelar</Link>
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

export default withRouter(ConfirmacionComponent)