import React from 'react'
import { withRouter } from 'react-router'
import NavigationComponent from '../components/Navegación/NavigationComponent'
import DespedidaPersonaComponent from '../components/Saludo/DespedidaPersonaComponent'

class DespedidaPersona extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <DespedidaPersonaComponent></DespedidaPersonaComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(DespedidaPersona)