import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import ConfiguracionPerfilComponent from '../../components/Perfil/ConfiguracionPerfilComponent'

class ConfiguracionPerfil extends React.Component {
    render(){
        return(
            <React.Fragment>
               <NavigationComponent></NavigationComponent>
                <ConfiguracionPerfilComponent></ConfiguracionPerfilComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ConfiguracionPerfil)