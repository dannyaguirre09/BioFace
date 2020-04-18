import React from 'react'
import CrearPersonaComponent from '../components/Persona/CrearPersonaComponent'
import NavigationComponent from '../components/Navegación/NavigationComponent'
import { withRouter } from 'react-router';

class CrearPersona extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <CrearPersonaComponent></CrearPersonaComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(CrearPersona)