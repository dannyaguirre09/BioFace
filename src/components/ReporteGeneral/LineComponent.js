import React from 'react';
import { Line } from 'react-chartjs-2';
import { withRouter } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const data = {
  labels: [],
  datasets: [
    {
      label: 'Número de Salidas',
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
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};


class LineComponent extends React.Component {

  obtenerDatos = async () => {
    const uri = "https://localhost:44393/api/ReporteGeneral/?mayorAMenorSalidas=1"
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
    this.setState(data);
}

  cambiarDatos(datosNuevos) {
    var _this = this;
    var oldDataSet = _this.state.datasets[0];
    var newData = [];
    var newlabels = [];

    for (let i = 0; i < datosNuevos.length; i++) {
      newData[i] = datosNuevos[i].IdRegistro;
      newlabels[i] = datosNuevos[i].Persona.NombrePersona + ' ' + datosNuevos[i].Persona.ApellidoPersona
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

  componentDidMount() {
   this.obtenerDatos();
  }

  mensajeError = (mensaje) => {
    toast.error(mensaje);
  }

  render() {
    return (
      <div>
        <ToastContainer></ToastContainer>
        <h4 className="text-center">Top 10 personas con más número de salidas </h4>
        <Line data={this.state} />
      </div>
    );
  }
}

export default withRouter(LineComponent)
