import React from 'react'
import LoginComponent from '../components/Login/LoginComponent'
import { ToastContainer } from 'react-toastify';
import { withRouter } from 'react-router';

class Login extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ToastContainer></ToastContainer>  
                <LoginComponent></LoginComponent>
            </React.Fragment>
        )
    }
}

export default withRouter(Login)