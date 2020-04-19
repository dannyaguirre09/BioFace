import React from 'react'
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

class ListaPersonasComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            buscar: '',
            listaPersonas: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.obtenerPersonas()
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    buscarPersona = async () => {
        const ruta = "https://localhost:44393/api/Persona/?nombrePersona=" + this.state.buscar
        await fetch(ruta)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    listaPersonas: data
                })
            })
            .catch(err => {
                this.mensaje();
            })
    }

    mensaje = () => {
        toast.error("Ocurrio un problema al conectarse con el servidor!")
    }

    obtenerPersonas = async () => {
        await fetch('https://localhost:44393/api/Persona')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    listaPersonas: data
                })
            })
            .catch(err => {
                this.mensaje();
            })
    }

    render() {
        return (
            <div className="container mx-auto">
                <div className=" col-sm-2"></div>
                <div className=" col-sm-10 panel-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9 text-center">
                                <label style={{ fontSize: '16px' }}>Lista de Personas</label>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-7">
                                <input name="buscar" className="form-control"
                                    type="text" onChange={this.handleChange} />
                            </div>
                            <div className="col-md-3">
                                <input style={{ backgroundColor: '#044F67' }} value="Buscar Persona"
                                    onClick={this.buscarPersona} className="btn" type="button" />
                            </div>
                        </div>
                        <br /><br /><br />
                        <div className="row">
                        
                            <div className="col-md-10 mx-auto ">
                                
                                <div className="panel panel-default">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">Apellido</th>
                                                    <th scope="col">Cédula</th>
                                                    <th scope="col">Correo</th>
                                                    <th scope="col" style={{ textAlign: 'center' }}>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="background">
                                                {
                                                    this.state.listaPersonas.map(lista => {
                                                        return (
                                                            <tr key={lista.IdPersona}>
                                                                <td>{lista.NombrePersona}</td>
                                                                <td>{lista.ApellidoPersona}</td>
                                                                <td>{lista.CedulaPersona}</td>
                                                                <td>{lista.CorreoPersona}</td>
                                                                <td>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <Link to={`/actualizar_persona/${lista.IdPersona}`}
                                                                                style={{ background: '#4B77BE' }}
                                                                                className="btn btn-block"> Editar</Link>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <Link to={`/agregar_imagen/${lista.IdPersona}`}
                                                                                style={{ background: '#317589' }}
                                                                                className="btn btn-block"> Asignar Imagen</Link>
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
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(ListaPersonasComponent)
