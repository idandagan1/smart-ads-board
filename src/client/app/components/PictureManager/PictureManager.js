/* global URL:true */
import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import Camera from 'react-camera';
import * as ajaxApi from '../../api/ajaxApi/ajaxApi';
import * as utils from '../../common/utils';

export default class PictureManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blob: '',
            imgSrc: ''
        };
        this.onPictureCapture = this.onPictureCapture.bind(this);
        this.getPerson = this.getPerson.bind(this);
        this.processImage = this.processImage.bind(this);
    }

    onPictureCapture () {
        this.camera.capture()
            .then((blob) => {
                const src = URL.createObjectURL(blob);
                this.setState({ imgSrc: src, blob });
                this.processImage();
            });
    }

    getPerson (url) {
        if (!url) {
            return;
        }
        return new Promise((resolve, reject) => {
            const { renderAnalyze } = this.props;
            const { blob, imgSrc } = this.state;
            utils.detectFace(url, blob)
                .then((res) => {
                    const parsedResult = JSON.parse(res.target.response);
                    let person = null;
                    renderAnalyze(imgSrc, parsedResult);
                    if (parsedResult) {
                        const { faceId } = parsedResult[0];
                        ajaxApi.getPersonIdByFaceId(faceId)
                            .then((result) => {
                                debugger;
                            });
                    }
                });
        });
    }

    processImage( ) {

        const uriBase = 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect';
        const params = {
            returnFaceId: true,
            returnFaceLandmarks: false,
            returnFaceAttributes: 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
        };
        const { blob } = this.state;
        const url = `${uriBase}?${$.param(params)}`;
        this.getPerson(url)
            .then((person) => {
                // TODO: get person details by personId
                if (!person) {
                    ajaxApi.createPerson(blob, (res) => {
                        debugger;
                    });
                }
            });
    };

    render() {
        return (
            <div>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                >
                    <input
                        type='button'
                        value='capture'
                        onClick={this.onPictureCapture}
                    />
                </Camera>
            </div>
        );
    }
}
