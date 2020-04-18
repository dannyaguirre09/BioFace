import React from 'react'
import ActualizarPersonaComponent from '../components/Persona/ActualizarPersonaComponent'
import NavigationComponent from '../components/Navegación/NavigationComponent'
import { withRouter } from 'react-router';

class ActualizarPersona extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ActualizarPersonaComponent></ActualizarPersonaComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ActualizarPersona)