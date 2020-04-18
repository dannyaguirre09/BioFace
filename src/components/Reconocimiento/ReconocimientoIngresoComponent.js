import React from 'react'
import { withRouter } from 'react-router';
import * as faceapi from 'face-api.js'

class ReconocimientoIngresoComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            ImagenPersona: '',
            idPersona: ''
        }
    }

    loadModel = async (canvas) => {
        let i = 0
        const processFace = async () => {
            const detection = await faceapi.detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())

            if (typeof detection === 'undefined') {
                return
            }
            else {
                i = i + 3
                if (i === 3) {
                    var data = canvas.toDataURL('image/png');
                    this.setState({
                        ImagenPersona: data
                    })
                    this.reconocimiento()
                }

            }
        }
        setInterval(processFace, 100)
    }

    reconocimiento = async() => {
        await fetch('https://localhost:44393/api/Reconocimiento', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    idPersona: data
                })
                if (this.state.idPersona[0] === 1) {
                    this.apagarCamara()
                    this.props.history.push('/bienvenida/' + this.state.idPersona[1])
                } else {
                    this.apagarCamara()
                    this.props.history.push('/lista_registros')
                }
            })
     }

    apagarCamara = () => {
        const videoContainer = document.querySelector('.js-video')

        let stream = videoContainer.srcObject;
        let tracks = stream.getTracks()

        tracks.forEach(function (track) {
            track.stop();
        });
    }

    prenderCamara = async () => {
        const videoContainer = document.querySelector('.js-video')
        const canvas = document.querySelector('.js-canvas')
        const context = canvas.getContext('2d')
        const video = await navigator.mediaDevices.getUserMedia({ video: true })

        this.loadModel(canvas);

        videoContainer.srcObject = video

        const reDraw = async () => {
            context.drawImage(videoContainer, 0, 0, 500, 400)

            requestAnimationFrame(reDraw)
        }
        requestAnimationFrame(reDraw)
    }

    componentDidMount() {
        this.prenderCamara();
    }

    componentWillUnmount() {
        this.apagarCamara()
    }

    render() {
        return (
            <div className="container mx-auto">
                <div className=" col-sm-2"></div>
                <div className=" col-sm-10 panel-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-5">
                                <h4 className="text-center">  ¡Por favor, mantenga la mirada al frente!</h4>
                                <video  width="500" height="500" autoPlay className="js-video"></video>
                                <canvas style={{ position: 'absolute' }, { top: '0' }, { visibility: 'hidden' }, { left: '0' }, { opacity: '0' }}
                                        width="500" height="400" autoPlay className="js-canvas"></canvas>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ReconocimientoIngresoComponent)