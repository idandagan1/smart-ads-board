import React, { Component } from 'react';
import PictureManager from '../PictureManager/PictureManager';


export default class Dashboard extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            imgSrc: 'https://www.parentspartner.com/wp-content/uploads/2011/06/angry-child-boy.jpg'
        }
    }

    onRenderAnalyze = (imgSrc, analyze) => {
        this.analyze.value = analyze;
        this.img.src = imgSrc;
    }
 
    render() {
		return (
			<div>
                <PictureManager renderAnalyze={this.onRenderAnalyze} />

                <div id='jsonOutput'>
                    <p>Response:</p>
                    <textarea
                        ref={(analyze) => {this.analyze = analyze;}}
                        className='UIInput'
                    />
                </div>
                <img 
                    alt='img'
                    ref={(img) => {this.img = img;}}
                    width='400'
                />
			</div>
		)
	}
}

