import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import { withRouter } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    labels: [
    ],
    datasets: [{
        data: [],
        label: 'Número de Ingreso por mes',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
    }]
};


class ChartConteoSalidoComponent extends React.Component {

    obtenerDatosContador = async () => {
        const uri = "https://localhost:44393/api/ReporteGeneral/?entrada=0";
        await fetch(uri)
            .then(res => res.json())
            .then(response => {
                this.cambiarDatos(response);
            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
    }

    formatearFecha(fechaRegistro) {
        const fecha = new Date(fechaRegistro);
        var opcionesFecha = { month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('es-EC', opcionesFecha).format(fecha)
    }

    cambiarDatos(datosNuevos) {
        var _this = this;
        var oldDataSet = _this.state.datasets[0];
        var newData = [];
        var newlabels = [];
        var color = [];

        for (let i = 0; i < datosNuevos.length; i++) {
            newData[i] = datosNuevos[i].IdRegistro;
            newlabels[i] = this.formatearFecha(datosNuevos[i].FechaSalida);
        }

        var newDataSet = {
            ...oldDataSet
        };

        newDataSet.data = newData;

        var newState = {
            labels: newlabels,
            datasets: [newDataSet]
        };

        _this.setState(newState);
    }

    componentWillMount() {
        this.setState(initialState);
    }

    componentDidMount() {       
        this.obtenerDatosContador();
    }

    mensajeError = (mensaje) => {
        toast.error(mensaje);
    }

    render() {
        return (
            <div>
                <ToastContainer></ToastContainer>
                <h4 className="text-center">Número de Registros de Salidas por Mes</h4>
                <HorizontalBar  data={this.state} />
            </div>

        );
    }

}

export default withRouter(ChartConteoSalidoComponent)