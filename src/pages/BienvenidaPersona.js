import React from 'react'
import { withRouter } from 'react-router'
import NavigationComponent from '../components/Navegación/NavigationComponent'
import BienvenidaPersonaComponent from '../components/Saludo/BienvenidaPersonaComponent'

class BienvenidaPersona extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <BienvenidaPersonaComponent></BienvenidaPersonaComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(BienvenidaPersona)