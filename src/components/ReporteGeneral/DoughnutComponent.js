import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { withRouter } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const data = {
    labels: [ ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [   ],
        hoverBackgroundColor: [  ]
    }]
};

class DoughnutComponent extends React.Component {

    obtenerDatos = async () => {
        const uri = "https://localhost:44393/api/ReporteGeneral/?mayorAMenorIngresos=1"
        await fetch(uri)
            .then(res => res.json())
            .then(response => {
                this.cambiarDatos(response)
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

    cambiarDatos(datosNuevos) {
        var _this = this;
        var oldDataSet = _this.state.datasets[0];
        var newlabels = [];
        var color = [];
        var newData = [];
        for (let i = 0; i < datosNuevos.length; i++) {
            newData[i] = datosNuevos[i].IdRegistro;
            newlabels[i] = datosNuevos[i].Persona.NombrePersona + ' ' + datosNuevos[i].Persona.ApellidoPersona
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

    mensajeError = (mensaje) => {
        toast.error(mensaje);
    }

    componentDidMount() {
        this.setState(data);
        this.obtenerDatos();
    }

    render() {
        return (
            <div>
                <ToastContainer></ToastContainer>
                <h4 className="text-center">Top 10 personas con más número de ingresos</h4>
                <Doughnut data={this.state} />
            </div>
        );
    }
}

export default withRouter(DoughnutComponent)