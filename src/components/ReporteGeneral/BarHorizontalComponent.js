import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { withRouter } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const data = {
    labels: [],
    datasets: [
        {
            label: 'Número de Ingresos',
            backgroundColor: 'rgba(25,92,112,0.2)',
            borderColor: 'rgba(27,98,150,0.2)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(25,92,112,0.2)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class BarHorizontalComponent extends React.Component {
    
    obtenerDatosContador = async () => {
        const uri = "https://localhost:44393/api/ReporteGeneral/?mayorAMenorIngresos=0";
        await fetch(uri)
            .then(res => res.json())
            .then(response => {
                this.cambiarDatos(response);
            })
            .catch(err => {
                this.mensajeError('No ha sido posible conectarse al servidor')
            })
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

    componentWillMount() {
        this.setState(data);
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
             <h4 className="text-center">Top 10 personas con menos número de ingresos </h4>
             <HorizontalBar data={this.state} />
          </div>
        );
      }
}

export default withRouter(BarHorizontalComponent)
