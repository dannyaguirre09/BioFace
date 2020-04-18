import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import ListaRegistroComponent from '../../components/Reporte/ListaRegistroComponent'

class ListaRegistro extends React.Component {
    render(){
        return(
            <React.Fragment>
               <NavigationComponent></NavigationComponent>
                <ListaRegistroComponent></ListaRegistroComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ListaRegistro)