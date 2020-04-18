import React from 'react';
import { Bar } from 'react-chartjs-2';
import { withRouter } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const data = {
    labels: ['January', 'February'],
    datasets: [{
        label: 'Promedio de hora ingresos',
        type: 'bar',
        data: ['51', '65'],
        fill: false,
        borderColor: '#EC932F',
        backgroundColor: '#004C99',
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '#EC932F',
        pointHoverBackgroundColor: '#EC932F',
        pointHoverBorderColor: '#EC932F',
        yAxisID: 'y-axis-1'
    }, {
        type: 'bar',
        label: 'Promedio de hora de salidas',
        data: ['200', '185'],
        fill: false,
        backgroundColor: '#71B37C',
        borderColor: '#71B37C',
        hoverBackgroundColor: '#71B37C',
        hoverBorderColor: '#71B37C',
        yAxisID: 'y-axis-2'
    }]
};

const options = {
    responsive: true,
    tooltips: {
        mode: 'label'
    },
    elements: {
        line: {
            fill: false
        }
    },
    scales: {

        xAxes: [
            {
                display: true,
                gridLines: {
                    display: true
                },
            }
        ],
        yAxes: [
            {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-1',
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                }
            },
            {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-2',
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                }
            }
        ]
    }
};


class BarMixComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            datos: {
                labels: [],
                datasets:[]
            },
            opciones: {}
        }
    }

    formatearFecha(fechaRegistro) {
        console.log(fechaRegistro)
        const fecha = new Date(fechaRegistro);
        var opcionesFecha = { month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('es-EC', opcionesFecha).format(fecha)
    }

    obtenerDatosIngreso = async () => {
        const uri = "https://localhost:44393/api/ReporteGeneral/?esEntrada=1"
        await fetch(uri)
            .then(res => res.json())
            .then(response => {                
                var newData = [];
                for (let i = 0; i < response.length; i++) {
                    newData[i] = response[i].Promedio;
                }                                         
                data.datasets[0].data = newData;
            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
    }

    obtenerDatosSalida = async () => {
        const uri = "https://localhost:44393/api/ReporteGeneral/?esEntrada=0"
        await fetch(uri)
            .then(res => res.json())
            .then(response => {
                var newlabels = [];
                var newData = [];
                for (let i = 0; i < response.length; i++) {                    
                    newlabels[i] = this.formatearFecha(response[i].FechaSalida);
                    newData[i] = response[i].Promedio
                }
                data.datasets[1].data = newData;
                data.labels = newlabels
            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
    }

    componentDidMount = async () => {
        await this.obtenerDatosIngreso()
        await this.obtenerDatosSalida()    
        this.setState({
            datos: {
                datasets: data.datasets,
                labels: data.labels
            }
         })
         
    }
    
    mensajeError = (mensaje) => {
        toast.error(mensaje);
    }

    render() {
        return (
            <div>
                <ToastContainer></ToastContainer>
                <h4 className="text-center">Promedio de hora de registro</h4>
                <Bar data={this.state.datos}
                    options={options}
                />
            </div>

        );
    }
}

export default withRouter(BarMixComponent)
