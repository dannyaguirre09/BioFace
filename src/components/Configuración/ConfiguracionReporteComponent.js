import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class ConfiguracioReportenComponent extends React.Component {

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
                                        <div className="col-md-2 ">
                                            <Link to={'\configuracion'} style={{ backgroundColor: '#044F67' }} className="btn btn-block">Regresar</Link>
                                        </div>
                                    </div>
                                    <br/><br/><br/>
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-4">
                                            <img src={process.env.PUBLIC_URL + 'dist/img/Dashboard.png'} width="200" height="200" className=" img-thumbnail" />
                                            <div className="col-md-10">
                                                <Link to={'/reporte_general/dashboard'} style={{ background: '#4B77BE' }} className="btn btn-block" >Dashboard General</Link>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <img src={process.env.PUBLIC_URL + 'dist/img/Persona.png'} width="200" height="200" className="img-thumbnail" />
                                            <div className="col-md-10">
                                                <Link to={'/reporte_persona'} style={{ background: '#4B77BE' }} className="btn btn-block" >Reporte por Persona</Link>
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

export default withRouter(ConfiguracioReportenComponent)