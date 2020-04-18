import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import ChartConteoIngresoComponent from '../../components/ReporteGeneral/ChartConteoIngresoComponent'
import ChartConteoSalidaComponent from '../../components/ReporteGeneral/ChartConteoSalidaComponent'
import BarMixComponent from '../../components/ReporteGeneral/BarMixComponent'
import DoughnutComponent from '../../components/ReporteGeneral/DoughnutComponent'
import LineComponent from '../../components/ReporteGeneral/LineComponent'
import BarHorizontalComponent from '../../components/ReporteGeneral/BarHorizontalComponent'
import LineSalidasComponent from '../../components/ReporteGeneral/LineSalidasComponent'
import BarTop10PromedioIngreso from '../../components/ReporteGeneral/BarTop10PromedioIngreso'
import BarTop10PromedioSalida from '../../components/ReporteGeneral/BarTop10PromedioSalida'
import LineTop10PromedioIngreso from '../../components/ReporteGeneral/LineTop10PromedioIngreso'
import LineTop10PromedioSalida from '../../components/ReporteGeneral/LineTop10PromedioSalida'
import { Link } from 'react-router-dom';

class DashBoard extends React.Component {
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
                                    <ChartConteoIngresoComponent></ChartConteoIngresoComponent>
                                </div>
                                <div className="col-md-5">
                                    <ChartConteoSalidaComponent></ChartConteoSalidaComponent>
                                </div>
                            </div>
                            <br /><br />
                            <div className="row">
                                <div className="col-md-5">
                                    <DoughnutComponent></DoughnutComponent>
                                </div>
                                <div className="col-md-5">
                                    <LineComponent></LineComponent>
                                </div>
                            </div>
                            <br /><br />
                            <div className="row">
                                <div className="col-md-5">
                                    <BarHorizontalComponent></BarHorizontalComponent>
                                </div>
                                <div className="col-md-5">
                                    <LineSalidasComponent></LineSalidasComponent>
                                </div>
                            </div>

                            <br /><br />
                            <div className="row">
                                <div className="col-md-5">
                                    <BarTop10PromedioIngreso></BarTop10PromedioIngreso>
                                </div>
                                <div className="col-md-5">
                                    <BarTop10PromedioSalida></BarTop10PromedioSalida>
                                </div>
                            </div>

                            <br /><br />
                            <div className="row">
                                <div className="col-md-5">
                                    <LineTop10PromedioIngreso></LineTop10PromedioIngreso>
                                </div>
                                <div className="col-md-5">
                                    <LineTop10PromedioSalida></LineTop10PromedioSalida>
                                </div>
                            </div>

                            <br /><br /><br />
                            <div className="row">
                                <div className="col-md-10">
                                    <BarMixComponent></BarMixComponent>
                                </div>
                            </div>
                            

                            <br /><br /><br />
                            <div className="row">
                                <div className="col-md-2 ">
                                    <Link to={'/configuracion_reporte'} style={{ backgroundColor: '#044F67' }} className="btn btn-block">Regresar</Link>
                                </div>
                                <div className="col-md-6"></div>
                                <div className="col-md-2 ">
                                    <Link to={'/reporte_general/dashboard/lista_registro_general'} style={{ backgroundColor: '#044F67' }} className="btn btn-block">Ver más</Link>
                                </div>                                
                            </div>
                           
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(DashBoard)

/**
 * <div className="row">
                                <div className="col-md-5">
                                    <ReportePersonaPieIngresoComponent></ReportePersonaPieIngresoComponent>
                                </div>
                                <div className="col-md-5">
                                    <ReportePersonaPieSalidaComponent></ReportePersonaPieSalidaComponent>
                                </div>
                            </div>
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
 */