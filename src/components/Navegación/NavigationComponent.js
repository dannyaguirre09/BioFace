import React from 'react'
import { Link } from 'react-router-dom'

class NavigationComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            UsernameUsuario: sessionStorage.getItem('username'),
            EsdAministrador: sessionStorage.getItem('administrador')
        }
    }


    componentDidMount = async () => {
        if (this.state.UsernameUsuario == null) {
            await this.buscarUsuario();
        } 
    }

    buscarUsuario = async () => {
        const data = localStorage.getItem('token');
        const ruta = "https://localhost:44393/api/Usuario/?idUsuario=" + data
        await fetch(ruta)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    UsernameUsuario: data.UsernameUsuario,
                    EsdAministrador: String(data.EsAdministrador)
                })

            })
            .catch(err => {
            })
    }

    render() {
        if (this.state.EsdAministrador == "true") {
            return (
                <div>
                    <nav role="navigation" className="navbar navbar-custom">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button data-target="#bs-content-row-navbar-collapse-5" data-toggle="collapse" className="navbar-toggle" type="button">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a href="#" className="navbar-brand">
                                    BioFace</a>
                            </div>
                            <div id="bs-content-row-navbar-collapse-5" className="collapse navbar-collapse">
                                <ul className="nav navbar-nav navbar-right">

                                    <li className="dropdown">
                                        <a data-toggle="dropdown" className="dropdown-toggle" href="#"><i className="glyphicon glyphicon-user"></i><b> {this.state.UsernameUsuario}</b> <b className="caret"></b></a>
                                        <ul role="menu" className="dropdown-menu">
                                            <li ><Link to={'/configuracion_perfil'}><i className="glyphicon glyphicon-wrench"></i>   Perfil</Link></li>
                                            <li ><Link to={'/logout'}><i className="glyphicon glyphicon-log-out"></i>   Salir</Link></li>
                                        </ul>
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </nav>

                    <div className="container-fluid">
                        <div className="row row-offcanvas row-offcanvas-left">
                            <div className="col-xs-6 col-sm-3 sidebar-offcanvas" role="navigation">
                                <ul className="list-group panel">
                                    <li className="list-group-item"><i className="glyphicon glyphicon-align-justify"></i><b>Men&uacute;</b></li>
                                    <li className="list-group-item">
                                        <i></i></li>
                                    <li className="list-group-item"><Link to={"/"} ><i className="glyphicon glyphicon-home"></i>Inicio </Link></li>

                                    <li className="list-group-item"><Link to={"/crear_persona"} ><i className="glyphicon glyphicon-certificate"></i>Creaci&oacute;n de registro de personas </Link></li>
                                    <li className="list-group-item"><Link to={"/lista_personas"} ><i className="glyphicon glyphicon-th-list"></i>Asignación de imágenes </Link></li>
                                    <li className="list-group-item"><Link to={"/lista_registros"} ><i className="glyphicon glyphicon-list-alt"></i>Reconocimiento </Link></li>
                                    <li className="list-group-item"><Link to={"/configuracion"}><i className="glyphicon glyphicon-cog"></i>Configuración</Link></li>
                                    <li className="list-group-item"><Link to={'/logout'}><i className="glyphicon glyphicon-log-out"></i>Salir</Link></li>

                                </ul>
                            </div>




                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <nav role="navigation" className="navbar navbar-custom">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button data-target="#bs-content-row-navbar-collapse-5" data-toggle="collapse" className="navbar-toggle" type="button">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a href="#" className="navbar-brand">
                                    BioFace</a>
                            </div>
                            <div id="bs-content-row-navbar-collapse-5" className="collapse navbar-collapse">
                                <ul className="nav navbar-nav navbar-right">

                                    <li className="dropdown">
                                        <a data-toggle="dropdown" className="dropdown-toggle" href="#"><i className="glyphicon glyphicon-user"></i><b> {this.state.UsernameUsuario}</b> <b className="caret"></b></a>
                                        <ul role="menu" className="dropdown-menu">
                                            <li ><Link to={'/configuracion_perfil'}><i className="glyphicon glyphicon-wrench"></i>   Perfil</Link></li>
                                            <li ><Link to={'/logout'}><i className="glyphicon glyphicon-log-out"></i>   Salir</Link></li>
                                        </ul>
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </nav>

                    <div className="container-fluid">
                        <div className="row row-offcanvas row-offcanvas-left">
                            <div className="col-xs-6 col-sm-3 sidebar-offcanvas" role="navigation">
                                <ul className="list-group panel">
                                    <li className="list-group-item"><i className="glyphicon glyphicon-align-justify"></i><b>Men&uacute;</b></li>
                                    <li className="list-group-item">
                                        <i></i></li>
                                    <li className="list-group-item"><Link to={"/"} ><i className="glyphicon glyphicon-home"></i>Inicio </Link></li>
                                    <li className="list-group-item"><Link to={"/lista_registros"} ><i className="glyphicon glyphicon-list-alt"></i>Reconocimiento </Link></li>
                                    <li className="list-group-item"><Link to={'/logout'}><i className="glyphicon glyphicon-log-out"></i>Salir</Link></li>

                                </ul>
                            </div>


                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default NavigationComponent