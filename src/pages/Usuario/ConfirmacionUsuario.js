import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import ConfirmacionUsuarioComponent from '../../components/Usuario/ConfirmacionUsuarioComponent'

class ConfirmacionUsuario extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ConfirmacionUsuarioComponent></ConfirmacionUsuarioComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ConfirmacionUsuario)