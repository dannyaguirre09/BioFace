import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../components/Navegación/NavigationComponent'
import ReconocimientoSalidaComponentt from '../components/Reconocimiento/ReconocimientoSalidaComponent'

class ReconocimientoIngreso extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ReconocimientoSalidaComponentt></ReconocimientoSalidaComponentt>
            </React.Fragment>
        )
    }
}

export default withRouter(ReconocimientoIngreso)