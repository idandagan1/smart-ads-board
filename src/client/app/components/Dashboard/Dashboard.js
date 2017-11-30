import React, { Component } from 'react';
import $ from 'jquery';
import PictureManager from '../PictureManager/PictureManager';

// const images = [
//     'http://www.coca-colacompany.com/content/dam/journey/us/en/private/2015/02/1991-print-ad-1280-673-bcb7d268.jpg',
//     'https://apple.insidercdn.com/gallery/21413-24435-Screenshot_1-l.jpg',
//     'https://naotw-pd.s3.amazonaws.com/media-youtube/ZkqOWl5vUZA.jpg?zB1fznYqvjNUmiqpBTx8ULnlE6X16jQ1',
//     'http://static1.businessinsider.com/image/4f0c8843ecad042f0b000013-480/fast-food-ads.jpg',
//     'https://si.wsj.net/public/resources/images/BN-US259_cmospo_J_20170816181450.jpg',
// ];

const showDetails = {
    display: 'inline-block',
    float: 'right',
    margin: '63px'
};
const hideDetails = {
    display: 'none'
};
export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPerson: {},
            persons: [{ age: '', gender: '', personId: '', glasses: '' }],
            adSrc: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/01/365-days-of-print-ads-its-been-128-days-ive-been-making-print-ads-every-single-day-still-237-days-to-go-fb__700-png.jpg',
        };
        this.onRenderAnalyze = this.onRenderAnalyze.bind(this);
        this.changeAd = this.changeAd.bind(this);
    }

    onRenderAnalyze(person) {
        if (person){
            $('#personDtls').css(showDetails);
            const { persons } = this.state;
            persons[person.personId] = person;
            this.setState({
                persons,
                currentPerson: person
            });
        } else {
            $('#personDtls').css(hideDetails);
            this.setState({
                currentPerson: {}
            });
        }

    }
    changeAd(ad) {
        let adSrc = '';
        if (typeof ad === 'string') {
            adSrc = ad;
        } else {
            switch (ad) {
                case 1:
                    adSrc = 'http://www.coca-colacompany.com/content/dam/journey/us/en/private/2015/02/1991-print-ad-1280-673-bcb7d268.jpg';
                    break;
                case 2:
                    adSrc = 'https://apple.insidercdn.com/gallery/21413-24435-Screenshot_1-l.jpg';
                    break;
                case 3:
                    adSrc = 'https://naotw-pd.s3.amazonaws.com/media-youtube/ZkqOWl5vUZA.jpg?zB1fznYqvjNUmiqpBTx8ULnlE6X16jQ1';
                    break;
                case 4:
                    adSrc = 'http://static1.businessinsider.com/image/4f0c8843ecad042f0b000013-480/fast-food-ads.jpg';
                    break;
                default:
                    adSrc = 'https://si.wsj.net/public/resources/images/BN-US259_cmospo_J_20170816181450.jpg';
                    break;
            }
        }
        this.setState({ adSrc });
    }

    render() {
        const { adSrc, currentPerson, persons } = this.state;
        const detailsCls = currentPerson.personId ? 'block': 'none';

        return (
            <div>
                <div className="camera">
                    <PictureManager
                        renderAnalyze={this.onRenderAnalyze}
                        changeAd={this.changeAd}
                        markedImage={this.markedImage}
                    />
                </div>
                <div className="ad">
                    <img
                        alt='Ads'
                        id='ad-id'
                        ref={(img) => { this.img = img; }}
                        src={adSrc}
                    />
                </div>
                <div style={{display: detailsCls}}

                    id='personDtls'>
                    <div>
                        <h1>PersonId:</h1>
                        <p>{currentPerson.personId}</p>
                    </div>
                    <div>
                        <h1>Gender:</h1>
                        <p>{currentPerson.gender === 'M' ? 'Male' : 'Female'}</p>
                    </div>
                    <div>
                        <h1>Age:</h1>
                        <p>{currentPerson.age}</p>
                    </div>
                    <div>
                        <h1>Glasses:</h1>
                        <p>{currentPerson.glasses === true ? 'True' : 'False'}</p>
                    </div>
                </div>
            </div>
        );
    }
}
