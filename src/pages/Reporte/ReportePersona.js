import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import ReportePersonaComponent from '../../components/Reporte/ReportePersonaComponent'

class ReportePersona extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ReportePersonaComponent></ReportePersonaComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ReportePersona)