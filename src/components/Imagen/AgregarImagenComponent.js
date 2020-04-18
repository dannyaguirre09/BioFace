import React from 'react'
import { withRouter } from 'react-router';
import * as faceapi from 'face-api.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CrearImagenComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            Imagen: {
                IdImagen: '',
                Persona: {
                    idPersona: ''
                },
                ImagenPersona: ''
            },
            listaImagenes: []
        }
        this.guardarImagen = this.guardarImagen.bind(this);
    }

    capturarImagen() {
        const canvas = document.querySelector('.js-canvas')
        let photo = document.querySelector('#photo')
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    guardarImagen = async (e) => {
        try {
            e.preventDefault()
            let photo = document.querySelector('#photo')
            const detection = await faceapi.detectSingleFace(photo, new faceapi.TinyFaceDetectorOptions())
            if (typeof detection === 'undefined') {
                this.mensajeError("No se ha detectado ningún rostro en la imagen");
            }
            else {
                var imagen = photo.src
                const uri = 'https://localhost:44393/api/Imagen'
                const { id_persona } = this.props.match.params
                this.setState({
                    Imagen: {
                        ImagenPersona: imagen,
                        Persona: {
                            idPersona: id_persona
                        }
                    }
                })
                await fetch(uri, {
                    method: 'POST',
                    body: JSON.stringify(this.state.Imagen),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data === 1) {
                            this.mensaje("Imagen agregada correctamente");
                            this.buscarImagenes(id_persona)
                        } else {
                            this.mensajeError("Ocurrió un problema al guardar la imagen");
                        }
                    })
                    .catch(err => {
                        this.mensajeError("No ha sido posible conectarse al servidor");
                    })
            }
        } catch (error) {
            this.mensajeError(error + " No hay ninguna imagen para cargar");
        }

    }

    eliminarImagen = async (idImagen) => {
        const { id_persona } = this.props.match.params
        const uri = 'https://localhost:44393/api/Imagen?idImagen=' + idImagen
        await fetch(uri, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data === 1) {
                    this.mensaje("Imagen eliminada correctamente")
                    this.buscarImagenes(id_persona)
                } else {
                    this.mensajeError("Ocurrió un problema al eliminar la imagen");
                }
            })
            .catch(err => {
                this.mensajeError("No ha sido posible conectarse con el servidor");
            })
    }

    salirPagina = async () => {
        const videoContainer = document.querySelector('.js-video')

        let stream = videoContainer.srcObject;
        let tracks = stream.getTracks()

        tracks.forEach(function (track) {
            track.stop();
        });
        this.props.history.push('/lista_personas')

    }

    iniciarVideo = async () => {
        const videoContainer = document.querySelector('.js-video')
        const canvas = document.querySelector('.js-canvas')
        let photo = document.querySelector('#photo')
        const context = canvas.getContext('2d')
        const video = await navigator.mediaDevices.getUserMedia({ video: true })

        videoContainer.srcObject = video

        const reDraw = async () => {
            context.drawImage(videoContainer, 0, 0, 350, 300)

            requestAnimationFrame(reDraw)
        }
        requestAnimationFrame(reDraw)
    }

    buscarImagenes = async (idPersona) => {
        const ruta = "https://localhost:44393/api/Imagen/?idPersona=" + idPersona
        await fetch(ruta)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    listaImagenes: data
                })
            })
            .catch(err => {
                this.mensajeError("No se ha podido conectar al servidor");
            })
    }

    componentDidMount() {
        const { id_persona } = this.props.match.params
        this.buscarImagenes(id_persona)
        this.iniciarVideo()
    }

    componentWillUnmount() {
        this.salirPagina()
    }

    mensaje = (mensaje) => {
        toast.info(mensaje)
    }

    mensajeError = (mensaje) => {
        toast.error(mensaje)
    }

    render() {
        return (
            <div className="container mx-auto">
                <div className=" col-sm-2"></div>
                <div className=" col-sm-10 panel-body">
                    <div className="container">
                        <div className="row">
                            <ToastContainer></ToastContainer>
                            <div className="col-md-4">
                                <canvas
                                    width="350" height="300" autoPlay className="js-canvas"></canvas>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button style={{ background: '#4B77BE' }}
                                                onClick={this.capturarImagen}
                                                className="btn btn-block">Capturar</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button style={{ background: '#317589' }}
                                                onClick={this.salirPagina}
                                                className="btn btn-block">Regresar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1">
                                <video style={{ position: 'absolute' }, { top: '0' }, { visibility: 'hidden' }, { left: '0' }, { opacity: '0' }}
                                    width="350" height="300" autoPlay className="js-video"></video>
                            </div>
                            <div className="col-md-4">
                                <form onSubmit={this.guardarImagen}>
                                    <div className="form-group">
                                        <img src="" id="photo" name="ImagenPersona" />
                                        <br /><br />
                                        <button style={{ background: '#317589' }}
                                            type="submit"
                                            className="btn btn-block">Guardar Imagen</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9 ">
                                <div className="panel-body">
                                    <div className="row">
                                        {
                                            this.state.listaImagenes.map(lista => {
                                                return (
                                                    <div key={lista.IdImagen} className="col-md-4">
                                                        <img src={`data:image/png;base64,${lista.ImagenPersona}`} alt="" className="w-100 h-100 img-thumbnail" />
                                                        <button onClick={() => this.eliminarImagen(lista.IdImagen)} style={{ background: '#C3272B' }} className="btn btn-block" href="#" >Eliminar</button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CrearImagenComponent)


