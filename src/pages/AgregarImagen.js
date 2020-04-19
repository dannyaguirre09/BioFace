import React from 'react'
import { withRouter } from 'react-router';
import NavigationComponent from '../components/Navegación/NavigationComponent'
import AgregarImagenComponent from '../components/Imagen/AgregarImagenComponent'
import { ToastContainer} from 'react-toastify';

class AgregarImagen extends React.Component {
    render(){
        return(
            <React.Fragment>
                <ToastContainer></ToastContainer>
                <NavigationComponent></NavigationComponent>
                <AgregarImagenComponent></AgregarImagenComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(AgregarImagen)