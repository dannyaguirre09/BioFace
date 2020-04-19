import React from 'react'
import NavigationComponent from '../components/Navegación/NavigationComponent'
import { ToastContainer} from 'react-toastify';
import ListaPersonasComponent from '../components/Persona/ListaPersonasComponent'
import { withRouter } from 'react-router';

class ListaPersonas extends React.Component {
    render(){
        return(
            <React.Fragment>
                <ToastContainer />
                <NavigationComponent></NavigationComponent>
                <ListaPersonasComponent></ListaPersonasComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(ListaPersonas)