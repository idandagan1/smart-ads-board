/* global URL:true; window:true */
import React, { Component } from 'react';
import Camera from 'react-camera';
import Stopwatch from 'timer-stopwatch';
import * as utils from '../../common/utils';

require('tracking');
require('tracking/build/data/face');
const delay = 8000;
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
            currentCreativeId: null,
            numOfAd: 1,
            persons: [],
        };
        this.startInterval = this.startInterval.bind(this);
        this.onPictureCapture = this.onPictureCapture.bind(this);
        this.onChangeAd = this.onChangeAd.bind(this);
        this.stopInterval = this.stopInterval.bind(this);
        this.startInterval = this.startInterval.bind(this);
        this.proseccPerson = this.proseccPerson.bind(this);

    }

    componentDidMount() {
        this.startInterval();
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
        console.log('capturing........');
        this.camera.capture()
            .then((blob) => {
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    utils.processImage(reader.result)
                        .then((res) => {
                            if (res.Errors && res.Errors[0].ErrCode === 5004) {// Not Exists
                                utils.addPerson(reader.result)
                                    .then((personResult) => {
                                        const person = utils.createPersonDate(JSON.parse(personResult));
                                        this.proseccPerson(person);
                                    });
                            } else if (res.images){
                                this.proseccPerson({personId: res.images[0].transaction.subject_id});
                            } else {
                                this.setState({ isCapturing: false });
                            }
                        });
                };
            });
    }
    proseccPerson(person) {
        //this.setState({ isCapturing: false });
        const { currentId, currentCreative } = this.state;
        const { changeAd, renderAnalyze, markedImage } = this.props;
        console.log('processing Person... ');
        if (!currentId && person) {
            this.setState({ currentId: person.personId });
        } else if (person && currentId === person.personId) {
            utils.setImpression(person, currentCreative, true);
        } else {
            utils.setImpression({personId: currentId}, currentCreative, false);
            this.setState({ currentId: null, currentCreative: null});
        }
        if (person) {
            this.stopInterval();
            utils.getCreatives(person).then((person)=> {
                console.log('found Creatives... ');
                renderAnalyze(person);
                if(person.creatives && person.creatives.length > 0 ){
                    const currentCreative = person.creatives[0];
                    const ad  = currentCreative.imgName;
                    console.log('showing add' + ad);
                    changeAd(ad);
                    this.setState({ inProccess: true, currentCreative: currentCreative.creativeId});
                    const timer = new Stopwatch(delay);
                    timer.start();
                    timer.onDone(() => {
                        console.log('done shoning target');
                        this.setState({ inProccess: false, isCapturing: false});
                        this.onPictureCapture();
                    });
                }else {
                    this.startInterval();
                }
            });

        } else {
            this.setState({ currentId: '' });
        }
    }

    showGif() {
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
                </Camera>
            </div>
        );
    }
}
