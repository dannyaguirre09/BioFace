import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../components/Navegación/NavigationComponent'
import AgregarImagenComponent from '../components/Imagen/AgregarImagenComponent'

class AgregarImagen extends React.Component {
    render(){
        return(
            <React.Fragment>
                <NavigationComponent></NavigationComponent>
                <AgregarImagenComponent></AgregarImagenComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(AgregarImagen)