import React from 'react';
import { Pie } from 'react-chartjs-2';
import { withRouter } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    labels: [
    ],
    datasets: [{
        data: [],
        backgroundColor: [
        ],
        hoverBackgroundColor: [
        ]
    }]
};

class ReportePersonaPieSalidaComponent extends React.Component {
    
    obtenerDatosContador = async () => {
        const { id_persona } = this.props.match.params
        const uri = "https://localhost:44393/api/Reporte/?idPersonaConteoSalida=" + id_persona
        await fetch(uri)
            .then(res => res.json())
            .then(response => {
                this.cambiarDatos(response);

            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
    }

    aleatorio(inferior, superior) {
        let numPosibilidades = superior - inferior
        let aleat = Math.random() * numPosibilidades
        aleat = Math.floor(aleat)
        return parseInt(inferior) + aleat
    }

    generarColor() {
        var hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F")
        var colorAleatorio = "#";
        for (let i = 0; i < 6; i++) {
            var posarray = this.aleatorio(0, hexadecimal.length)
            colorAleatorio += hexadecimal[posarray]
        }
        return colorAleatorio
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
            color[i] = this.generarColor();
        }

        var newDataSet = {
            ...oldDataSet
        };

        newDataSet.backgroundColor = color;
        newDataSet.hoverBackgroundColor = color;
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
                <Pie data={this.state} />
            </div>

        );
    }

}

export default withRouter(ReportePersonaPieSalidaComponent)