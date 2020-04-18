import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import ConfiguracionReporteComponent from '../../components/Configuración/ConfiguracionReporteComponent'

class ConfiguracionReporte extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ConfiguracionReporteComponent></ConfiguracionReporteComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ConfiguracionReporte)