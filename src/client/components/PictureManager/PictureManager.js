/* global URL:true; window:true */
import React, { Component } from 'react';
import $ from 'jquery';
import Camera from 'react-camera';
import Stopwatch from 'timer-stopwatch';
import * as ajaxApi from '../../api/ajaxApi/ajaxApi';
import * as utils from '../../common/utils';

export default class PictureManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reader: new window.FileReader(),
            inProccess: false,
            counter: 3,
            currentId: '',
            candidateId: '',
        };
        setInterval(this.onPictureCapture, 3000);
        setInterval(this.counterInterval, 1000);
    }

    onPictureCapture = () => {
        const { reader, inProccess } = this.state;
        const { renderAnalyze } = this.props;

        if (inProccess) {
            console.log('not capturing');
            return;
        }
        this.camera.capture()
            .then((blob) => {
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    utils.processImage(reader.result)
                        .then(this.afterImageProcess);
                };
                const src = URL.createObjectURL(blob);
                renderAnalyze(src);
            });
    }

    afterImageProcess = (data) => {
        console.log('after image proceccing');
        const { counter, currentId } = this.state;
        if (!data.Errors) {
            // Recognized face
            // const timer = new Stopwatch(6000);
            // timer.onDone(() => {
            //     debugger;
            //     console.log('Timer is complete');
            // });
            this.setState({ inProccess: true });
            if (!currentId) {
                this.setState({ currentId: data.images[0].transaction.subject_id });
            } else {
                this.setState({ candidateId: data.images[0].transaction.subject_id });
            }
        }
    }

    counterInterval = () => {
        const { counter, currentId, candidateId } = this.state;

        if (counter > 6) {
            this.setState({ inProccess: false, counter });
        }

        this.setState({ counter: counter + 1 });
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
