import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../components/Navegación/NavigationComponent'
import ReconocimientoIngresoComponent from '../components/Reconocimiento/ReconocimientoIngresoComponent'

class ReconocimientoIngreso extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ReconocimientoIngresoComponent></ReconocimientoIngresoComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ReconocimientoIngreso)