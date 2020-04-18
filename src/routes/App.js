import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Index from '../pages/Index'
import CrearPersona from '../pages/CrearPersona'
import ActualizarPersona from '../pages/ActualizarPersona'
import ListaPersonas from '../pages/ListaPersonas'
import AgregarImagen from '../pages/AgregarImagen'
import ReconocimientoIngreso from '../pages/ReconocimientoIngreso'
import ReconocimientoSalida from '../pages/ReconocimientoSalida'
import BienvenidaPersona from '../pages/BienvenidaPersona'
import DespedidaPersona from '../pages/DespedidaPersona'
import ListaRegistros from '../pages/ListaRegistros'
import Confirmacion from '../pages/Confirmacion'
import Configuracion from '../pages/Configuración/Configuracion'
import ConfiguracionReporte from '../pages/Configuración/ConfiguracionReporte'
import CrearUsuario from '../pages/Usuario/CrearUsuario'
import ActualizarUsuario from '../pages/Usuario/ActualizarUsuario'
import ConfirmacionUsuario from '../pages/Usuario/ConfirmacionUsuario'
import ActualizarPass from '../pages/Perfil/ActualizarPass'
import ListaUsuario from '../pages/Usuario/ListaUsuario'
import PrivateRoute from '../Util/Auth'
import ReportePersona from '../pages/Reporte/ReportePersona'
import ReporteLinealPersona from '../pages/Reporte/ReporteLinealPersona'
import ListaRegistro from '../pages/Reporte/ListaRegistro'
import ConfiguracionPerfil from '../pages/Perfil/ConfiguracionPerfil'
import DashBoard from '../pages/Dashboard/DashBoard'
import ListaReporteGeneral from '../pages/Dashboard/ListaReporteGeneral'
import EliminarRegistro from '../pages/Registro/EliminarRegistro'



const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component ={Login} ></Route>    
            <PrivateRoute exact path="/" component ={Index} ></PrivateRoute>  
            <PrivateRoute exact path="/crear_persona" component ={CrearPersona}></PrivateRoute>  
            <PrivateRoute exact path="/actualizar_persona/:id_persona" component ={ActualizarPersona}></PrivateRoute>
            <PrivateRoute exact path="/lista_personas" component ={ListaPersonas}></PrivateRoute> 
            <PrivateRoute exact path="/agregar_imagen/:id_persona" component ={AgregarImagen}></PrivateRoute>
            <PrivateRoute exact path="/reconocimiento_ingreso" component ={ReconocimientoIngreso}></PrivateRoute>
            <PrivateRoute exact path="/reconocimiento_salida" component ={ReconocimientoSalida}></PrivateRoute>
            <PrivateRoute exact path="/bienvenida/:id_persona" component ={BienvenidaPersona}></PrivateRoute> 
            <PrivateRoute exact path="/despedida/:id_persona" component ={DespedidaPersona}></PrivateRoute> 
            <PrivateRoute exact path="/lista_registros" component ={ListaRegistros}></PrivateRoute>
            <PrivateRoute exact path="/confirmacion_eliminar_persona/:id_persona" component ={Confirmacion}></PrivateRoute>               
            <PrivateRoute exact path="/configuracion" component ={Configuracion}></PrivateRoute>
            <PrivateRoute exact path="/configuracion_reporte" component ={ConfiguracionReporte}></PrivateRoute>
            <PrivateRoute exact path="/configuracion_perfil" component ={ConfiguracionPerfil}></PrivateRoute>
            <PrivateRoute exact path="/crear_usuario" component ={CrearUsuario}></PrivateRoute> 
            <PrivateRoute exact path="/actualizar_usuario/:id_usuario" component ={ActualizarUsuario}></PrivateRoute> 
            <PrivateRoute exact path="/confirmacion_eliminar_usuario/:id_usuario" component ={ConfirmacionUsuario}></PrivateRoute>
            <PrivateRoute exact path="/lista_usuarios" component ={ListaUsuario}></PrivateRoute> 
            <PrivateRoute exact path="/reporte_persona" component ={ReportePersona}></PrivateRoute> 
            <PrivateRoute exact path="/reporte_persona/reporte_lineal/:id_persona" component ={ReporteLinealPersona}></PrivateRoute>
            <PrivateRoute exact path="/reporte_persona/reporte_lineal/lista_registro/:id_persona" component ={ListaRegistro}></PrivateRoute>
            <PrivateRoute exact path="/reporte_general/dashboard" component ={DashBoard}></PrivateRoute>
            <PrivateRoute exact path="/reporte_general/dashboard/lista_registro_general" component ={ListaReporteGeneral}></PrivateRoute>
            <PrivateRoute exact path="/configuracion/eliminar_registro" component ={EliminarRegistro}></PrivateRoute>
            <PrivateRoute exact path="/actualizar_password" component ={ActualizarPass}></PrivateRoute>
            <Route  exact path="/logout" component ={Logout} ></Route>    
        </Switch>
    </BrowserRouter>
)
    

export default App