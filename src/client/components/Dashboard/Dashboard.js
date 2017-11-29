import React, { Component } from 'react';
import PictureManager from '../PictureManager/PictureManager';
import * as ajaxApi from '../../api/ajaxApi/ajaxApi';

export default class Dashboard extends Component {

    onRenderAnalyze = (imgSrc) => {
        //this.analyze.value = JSON.stringify(analyze);
        this.img.src = imgSrc;
    }

    render() {
        return (
            <div>
                <PictureManager renderAnalyze={this.onRenderAnalyze} />
                <div id='jsonOutput'>
                    <p>Response:</p>
                    <textarea
                        ref={(analyze) => { this.analyze = analyze; }}
                        className='UIInput'
                    />
                </div>
                <img
                    alt='img'
                    ref={(img) => { this.img = img; }}
                    width='400'
                />
            </div>
        );
    }
}
