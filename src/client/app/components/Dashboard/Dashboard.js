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
    margin: '63px',
};

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPerson: 0,
            persons: [{ age: '', gender: '', personId: '', glasses: '' }],
            adSrc: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/01/365-days-of-print-ads-its-been-128-days-ive-been-making-print-ads-every-single-day-still-237-days-to-go-fb__700-png.jpg',
        };
        this.onRenderAnalyze = this.onRenderAnalyze.bind(this);
        this.changeAd = this.changeAd.bind(this);
        this.loadImg = this.loadImg.bind(this);
    }

    onRenderAnalyze(person) {
        $('#personDtls').css(showDetails);
        const { persons } = this.state;
        persons[person.personId] = person;
        this.setState({
            persons,
            currentPerson: person.personId,
        });
    }

    changeAd(ad) {
        $('#personDtls').css({ display: 'none' });
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
        $('#ad-id').fadeOut(100);
        this.setState({ adSrc });
    }

    loadImg() {
        $('#ad-id').fadeIn(50);
    }

    render() {
        const { adSrc, currentPerson, persons } = this.state;

        return (
            <div>
                <div>
                    <PictureManager
                        renderAnalyze={this.onRenderAnalyze}
                        changeAd={this.changeAd}
                        markedImage={this.markedImage}
                    />
                </div>
                <img
                    alt='Ads'
                    id='ad-id'
                    ref={(img) => { this.img = img; }}
                    src={adSrc}
                    onLoad={this.loadImg}
                />
                <div id='personDtls'>
                    <div>
                        <h1>PersonId:</h1>
                        <p>{persons[currentPerson].personId}</p>
                    </div>
                    <div>
                        <h1>Gender:</h1>
                        <p>{persons[currentPerson].gender === 'M' ? 'Male' : 'Female'}</p>
                    </div>
                    <div>
                        <h1>Age:</h1>
                        <p>{persons[currentPerson].age}</p>
                    </div>
                    <div>
                        <h1>Glasses:</h1>
                        <p>{persons[currentPerson].glasses === false ? 'False' : 'True'}</p>
                    </div>
                </div>
            </div>
        );
    }
}
