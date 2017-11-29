/* global URL:true; window:true */
import React, { Component } from 'react';
import $ from 'jquery';
import Camera from 'react-camera';
import * as ajaxApi from '../../api/ajaxApi/ajaxApi';
import * as utils from '../../common/utils';

export default class PictureManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reader: new window.FileReader(),
        };
    }

    onPictureCapture = () => {
        const { reader } = this.state;
        const { renderAnalyze } = this.props;

        this.camera.capture()
            .then((blob) => {
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    utils.processImage(reader.result);
                };
                const src = URL.createObjectURL(blob);
                renderAnalyze(src);
            });
    }

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
