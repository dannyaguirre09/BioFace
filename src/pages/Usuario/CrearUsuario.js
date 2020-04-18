import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import CrearUsuarioComponent from '../../components/Usuario/CrearUsuarioComponent'

class CrearUsuario extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <CrearUsuarioComponent></CrearUsuarioComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(CrearUsuario)