import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import ConfiguracionComponent from '../../components/Configuración/ConfiguraciónComponent'

class Configuracion extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ConfiguracionComponent></ConfiguracionComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(Configuracion)