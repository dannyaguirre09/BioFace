import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class ConfiguracionComponent extends React.Component {

    render() {
        return (
            <div className="container mx-auto">
                <div className=" col-sm-2"></div>
                <div className=" col-sm-10 panel-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9 ">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={process.env.PUBLIC_URL + 'dist/img/usuario.png'} width="200" height="200" className=" img-thumbnail" />
                                            <div className="col-md-10">
                                                <Link to={'/lista_usuarios'} style={{ background: '#4B77BE' }} className="btn btn-block" >Usuarios</Link>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <img src={process.env.PUBLIC_URL + 'dist/img/Registro.png'} width="200" height="200" className="img-thumbnail" />
                                            <div className="col-md-10">
                                                <Link to={'/configuracion/eliminar_registro'} style={{ background: '#4B77BE' }} className="btn btn-block" >Eliminar Registros</Link>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <img src={process.env.PUBLIC_URL + 'dist/img/Reporte.png'} width="200" height="200" className="img-thumbnail" />
                                            <div className="col-md-10">
                                                <Link  to= {'/configuracion_reporte'} style={{ background: '#4B77BE' }} className="btn btn-block" >Reportes</Link>
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

export default withRouter(ConfiguracionComponent)