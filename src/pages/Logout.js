import React from 'react'
import LogoutComponent from '../components/Login/LogoutComponent'
import { withRouter } from 'react-router';


class Logout extends React.Component {
    render() {
        return (
            <LogoutComponent></LogoutComponent>
        )
    }
}

export default withRouter(Logout)