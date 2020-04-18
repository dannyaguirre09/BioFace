import React from 'react';
import { Line } from 'react-chartjs-2';
import { withRouter } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    labels: [],
    datasets: [
        {
            label: 'Hora Registro Salida',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }
    ]
};

class ReportePesonaSalida extends React.Component {

    obtenerDatosFecha = async () => {
        const { id_persona } = this.props.match.params
        const uri = "https://localhost:44393/api/Reporte/?idPersonaFechaSalida=" + id_persona
        await fetch(uri)
            .then(res => res.json())
            .then(response => {
                this.setState({
                    labels: response
                })

            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
    }

    obtenerDatosHora = async () => {
        const { id_persona } = this.props.match.params
        const uri = "https://localhost:44393/api/Reporte/?idPersonaHoraSalida=" + id_persona
        await fetch(uri)
            .then(res => res.json())
            .then(response => {
                this.cambiarDatos(response)
            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
    }

    componentWillMount() {
        this.setState(initialState);
    }

    cambiarDatos(datosNuevos) {
        var _this = this;
        var oldDataSet = _this.state.datasets[0];
        var newData = datosNuevos;

        var newDataSet = {
            ...oldDataSet
        };

        newDataSet.data = newData;

        var newState = {
            datasets: [newDataSet]
        };

        _this.setState(newState);
    }

    componentDidMount() {
        this.obtenerDatosFecha();
        this.obtenerDatosHora();
    }

    mensajeError = (mensaje) => {
        toast.error(mensaje);
    }

    render() {
        return (
            <div>
                <ToastContainer></ToastContainer>
                <h4 className="text-center">Reporte de Registro de Salida</h4>
                <Line data={this.state} height={120} />
            </div>

        );
    }

}

export default withRouter(ReportePesonaSalida)