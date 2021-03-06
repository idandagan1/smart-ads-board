/* global URL:true; window:true */
import React, { Component } from 'react';
import Camera from 'react-camera';
import Stopwatch from 'timer-stopwatch';
import * as utils from '../../common/utils';

require('tracking');
require('tracking/build/data/face');
const delay = 10000;
const intervals = 4000;
const style = {};

export default class PictureManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reader: new window.FileReader(),
            inProccess: false,
            isCapturing: false,
            currentId: '',
            numOfAd: 1,
            persons: [],
        };
        this.startInterval = this.startInterval.bind(this);
        this.onPictureCapture = this.onPictureCapture.bind(this);
        this.onChangeAd = this.onChangeAd.bind(this);
        this.stopInterval = this.stopInterval.bind(this);
        this.startInterval = this.startInterval.bind(this);
        this.proseccPerson = this.proseccPerson.bind(this);
        this.startInterval();
    }

    componentDidMount() {
        this.tracker = new window.tracking.ObjectTracker('face');
        this.tracker.setInitialScale(4);
        this.tracker.setStepSize(2);
        this.tracker.setEdgesDensity(0.1);
        window.tracking.track(this.camera.video, this.tracker);
        this.tracker.on('track', (e) => {
            const { isCapturing } = this.state;
            if (e.data.length > 0 && !isCapturing) {
                this.onPictureCapture();
            }
        });
    }

    onChangeAd() {
        const { numOfAd } = this.state;
        const { changeAd } = this.props;
        changeAd((numOfAd % 4) + 1);
        this.setState({ numOfAd: numOfAd + 1 });
    }

    onPictureCapture() {
        const { reader, inProccess } = this.state;
        this.setState({ isCapturing: true });
        if (inProccess) {
            console.log('in process');
            return;
        }
        this.camera.capture()
            .then((blob) => {
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    utils.processImage(reader.result)
                        .then((res) => {
                            if (res.Errors) {
                                utils.getCreatives(reader.result)
                                    .then((person) => {
                                        const { persons } = this.state;
                                        persons[person.personId] = persons;
                                        this.setState({ persons });
                                        this.proseccPerson(person);
                                    });
                            } else {
                                const { persons } = this.state;
                                this.proseccPerson(persons[res.images[0].transaction.subject_id]);
                            }
                        });
                };
            });
    }

    proseccPerson(person) {
        this.setState({ isCapturing: false });
        const { currentId } = this.state;
        const { changeAd, renderAnalyze, markedImage } = this.props;
        if (person) {
            // Recognized face
            console.log('found face...');
            this.stopInterval();
            renderAnalyze(person);
            //const img = utils.getCreatives(data);
            //changeAd('https://cdn.static-economist.com/sites/default/files/images/2017/06/articles/main/20170610_ldp501.jpg');
            this.setState({ inProccess: true });
            const timer = new Stopwatch(delay);
            timer.start();
            timer.onDone(() => {
                this.startInterval();
                this.setState({ inProccess: false, isCapturing: false });
            });
            if (!currentId) {
                this.setState({ currentId: person.subject_id });
            } else if (currentId === person.subject_id) {
                //this.startInterval();
            } else {
                this.setState({ currentId: person.subject_id });
            }
        } else {
            this.setState({ currentId: '' });
        }
    }

    stopInterval() {
        clearInterval(this.interval);
    }

    startInterval() {
        console.log('in start interval');
        this.interval = setInterval(this.onChangeAd, intervals);
    }

    render() {
        return (
            <div>
                <Camera
                    style={style.preview}
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
