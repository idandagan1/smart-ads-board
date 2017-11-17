import React, { Component } from 'react';
import $ from 'jquery';
import Camera from 'react-camera';

export default class PictureManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blob: '',
            imgSrc: ''
        }
    }

    processImage = () => {
        const { renderAnalyze } = this.props;
        const { blob, imgSrc } = this.state;
        const subscriptionKey = "fb87c7edb03a4449906bf0dd8e4993a1";
        const uriBase = "https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect";
        const params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
        };

        const oReq = new XMLHttpRequest();
        const url = `${uriBase}?${$.param(params)}`;
        oReq.open("POST", url, true);
        oReq.setRequestHeader("Content-Type","application/octet-stream");
        oReq.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        oReq.onload = function (e) {
            renderAnalyze(imgSrc, e.target.response);
        };
        
        oReq.send(blob);
    };
        
    onPictureCapture = () => {
        this.camera.capture()
            .then(blob => {
                const src = URL.createObjectURL(blob);
                this.setState({ imgSrc: src, blob});
                this.processImage();
            })
    }

    render() {
        return (
            <div>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                >
                <input type="button" value="capture" onClick={this.onPictureCapture} />                    
                </Camera>
            </div>   
        )
    }
}