import React from 'react'
import { withRouter } from 'react-router';

class LogoutComponent extends React.Component {
    
    componentWillMount() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('nombre');
        sessionStorage.removeItem('apellido');
        sessionStorage.removeItem('administrador');
        this.props.history.push('/login');
    }
    
    render() {
        return null;
    }
}

export default withRouter(LogoutComponent)