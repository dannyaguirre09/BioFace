import React from 'react';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CrearPersonaComponent extends React.Component {

  constructor() {
    super()
    this.state = {
        NombrePersona: "",
        ApellidoPersona: "",
        DireccionPersona: "",
        CorreoPersona: "",
        CedulaPersona: "",
        FechaNacimiento: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.agregarPersona = this.agregarPersona.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  agregarPersona = async (e) => {
    this.setState({
      loading: true
    })
    e.preventDefault()
    await fetch('https://localhost:44393/api/Persona', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data == 1) {        
        this.props.history.push('/lista_personas');
        this.mensaje(1)
      } else {        
        this.props.history.push('/lista_personas');
        this.mensaje(2);
      }
    })
    .catch(err => {        
        this.props.history.push('/lista_personas');
        this.mensaje(3)
    })

  }

  mensaje = (estado) => {
    if (estado == 1)
      toast.info("Registro guardado correctamente!")
    else if (estado == 2)
      toast.error("Ocurrio un problema al guardar el registro!") 
    else   
     toast.error("Ocurrio un problema al conectarse con el servidor")  
  }

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
                    <h5 style={{ fontSize: '16px' }} className="panel-title text-center">Ingresar Persona</h5>
                  </div>
                  <div className="panel-body">
                    <form onSubmit={this.agregarPersona}>
                      <div className="form-group ">
                        <label>Nombre de la persona</label>
                        <input required type="text" className="form-control"
                          name="nombrePersona" onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Apellido de la persona</label>
                        <input required type="text" className="form-control"
                          name="apellidoPersona" onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Cédula de la persona</label>
                        <input required type="text" className="form-control"
                          name="cedulaPersona" onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Dirección de la persona</label>
                        <input required type="text" className="form-control"
                          name="direccionPersona" onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Correo electrónico</label>
                        <input required type="email" className="form-control"
                          name="correoPersona" onChange={this.handleChange} />
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Fecha de nacimiento</label>
                            <input required type="date" className="form-control"
                              name="fechaNacimiento" onChange={this.handleChange} />
                          </div>
                        </div>
                      </div>
                      <div className="form-group ">
                        <button type="submit" style={{ backgroundColor: '#044F67' }} className="btn btn-block">Guardar</button>
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

export default withRouter(CrearPersonaComponent)