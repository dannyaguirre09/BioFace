import React from 'react'
import NavigationComponent from '../components/Navegación/NavigationComponent'
import ListaRegistrosComponent from '../components/Registro/ListaRegistrosComponent'
import { withRouter } from 'react-router';

class ListaRegistros extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ListaRegistrosComponent></ListaRegistrosComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ListaRegistros)