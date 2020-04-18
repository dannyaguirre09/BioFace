import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../../components/Navegación/NavigationComponent'
import EliminarRegistroComponent from '../../components/Registro/EliminarRegistroComponent'

class EliminarRegistro extends React.Component {
    render(){
        return(
            <React.Fragment>
               <NavigationComponent></NavigationComponent>
                <EliminarRegistroComponent></EliminarRegistroComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(EliminarRegistro)