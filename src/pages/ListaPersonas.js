import React from 'react'
import NavigationComponent from '../components/Navegación/NavigationComponent'
import ListaPersonasComponent from '../components/Persona/ListaPersonasComponent'
import { withRouter } from 'react-router';

class ListaPersonas extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ListaPersonasComponent></ListaPersonasComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ListaPersonas)