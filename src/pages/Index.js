import React from 'react'
import { withRouter } from 'react-router'
import NavigationComponent from '../components/Navegación/NavigationComponent'
import IndexComponent from '../components/Inicio/IndexComponent'

class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavigationComponent></NavigationComponent>
        <IndexComponent></IndexComponent>
      </React.Fragment>
    )
  }
}



export default withRouter(Index)
