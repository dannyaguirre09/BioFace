import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class BotonComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            IdPersona: ''
        }
    }

    componentDidMount() {
        const { id_persona } = this.props.match.params        
        this.setState({
            IdPersona: id_persona
        })
    }

    render() {
        return(
            <Link to={`/reporte_persona/reporte_lineal/lista_registro/${this.state.IdPersona}`} style={{ backgroundColor: '#044F67' }} className="btn btn-block">Ver Más</Link>
        )
    }
}

export default withRouter (BotonComponent)