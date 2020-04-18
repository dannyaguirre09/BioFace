import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import ListaUsuarioComponent from '../../components/Usuario/ListaUsuarioComponent'

class ListaUsuario extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ListaUsuarioComponent></ListaUsuarioComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ListaUsuario)