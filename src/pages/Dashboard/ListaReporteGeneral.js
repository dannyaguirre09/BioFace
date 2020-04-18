import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import ListaReporteGeneralComponent from '../../components/ReporteGeneral/ListaReporteGeneralComponent'

class ListaReporteGeneral extends React.Component {
    render(){
        return(
            <React.Fragment>
               <NavigationComponent></NavigationComponent>
                <ListaReporteGeneralComponent></ListaReporteGeneralComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ListaReporteGeneral)