import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import ActualizarUsuarioComponent from '../../components/Usuario/ActualizarUsuarioComponent'

class ActualizarUsuario extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ActualizarUsuarioComponent></ActualizarUsuarioComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ActualizarUsuario)