import React from 'react'
import ConfirmacionComponent from '../components/Persona/ConfirmacionComponent'
import NavigationComponent from '../components/Navegación/NavigationComponent'
import { withRouter } from 'react-router';

class Confirmacion extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ConfirmacionComponent></ConfirmacionComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(Confirmacion)