import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import ReporteLinealPersonaComponent from '../../components/Reporte/ReporteLinealPersonaComponent'
import ReportePersonaSalida from '../../components/Reporte/ReportePersonaSalida'
import ReportePersonaPieIngresoComponent from '../../components/Reporte/ReportePersonaPieIngresoComponent'
import ReportePersonaPieSalidaComponent from '../../components/Reporte/ReportePersonaPieSalidaComponent'
import BotonComponent from '../../components/Reporte/BotonComponent'
import { Link } from 'react-router-dom';

class ReporteLinealPersona extends React.Component {
     
    render() {
        return (
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <div className="container mx-auto">
                    <div className=" col-sm-2"></div>
                    <div className=" col-sm-10 panel-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5">
                                    <ReporteLinealPersonaComponent></ReporteLinealPersonaComponent>
                                </div>
                                <div className="col-md-5">
                                    <ReportePersonaSalida></ReportePersonaSalida>
                                </div>
                            </div>
                            <br /><br /><br />
                            <div className="row">
                                <div className="col-md-5">
                                    <ReportePersonaPieIngresoComponent></ReportePersonaPieIngresoComponent>
                                </div>
                                <div className="col-md-5">
                                    <ReportePersonaPieSalidaComponent></ReportePersonaPieSalidaComponent>
                                </div>
                            </div>   
                            <br/><br/><br/>                        
                            <div className="row">                            
                                <div className="col-md-2">
                                    <Link to={'/reporte_persona'} style={{ background: '#317589' }} className="btn btn-block">Regresar</Link>
                                </div>
                                <div className="col-md-6"></div>
                                <div className="col-md-2">
                                    <BotonComponent></BotonComponent>
                                </div>
                            </div>
                            <br></br>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(ReporteLinealPersona)