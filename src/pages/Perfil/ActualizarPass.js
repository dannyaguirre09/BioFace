import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import ActualizarPassComponent from '../../components/Perfil/ActualizarPassComponent'

class ActualizarPass extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <ActualizarPassComponent></ActualizarPassComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ActualizarPass)