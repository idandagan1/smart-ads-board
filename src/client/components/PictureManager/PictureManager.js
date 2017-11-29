/* global URL:true; window:true */
import React, { Component } from 'react';
import $ from 'jquery';
import Camera from 'react-camera';
import Stopwatch from 'timer-stopwatch';
import * as ajaxApi from '../../api/ajaxApi/ajaxApi';
import * as utils from '../../common/utils';

const delay = 8000;

export default class PictureManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reader: new window.FileReader(),
            inProccess: false,
            counter: 3,
            currentId: '',
        };
        setInterval(this.onPictureCapture, 3000);
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
        console.log('capturing...');
        const { counter, currentId } = this.state;
        if (!data.Errors) {
            // Recognized face
            this.setState({ inProccess: true });
            const timer = new Stopwatch(delay);
            timer.start();
            timer.onDone(() => {
                this.setState({ inProccess: false });
            });
            if (!currentId) {
                this.setState({ currentId: data.images[0].transaction.subject_id });
            } else if (currentId === data.images[0].transaction.subject_id) {
                console.log('same face for 8 sec');
            } else {
                this.setState({ currentId: data.images[0].transaction.subject_id });
            }
        } else {
            this.setState({ currentId: '' });
        }
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
