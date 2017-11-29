import $ from 'jquery';
import uuidv4 from 'uuid/v4';
import * as ajaxApi from '../api/ajaxApi/ajaxApi';

const headers = {
    app_id: '2f9359bf',
    app_key: 'eb244c3f0b340cd24f3cb02d872fa507',
};

export function processImage(image) {
    detectPerson(image);
}

export function removeGallery() {
    const url = 'https://api.kairos.com/gallery/remove';
    const payload = {
        gallery_name: 'Hackathon',
    };
    return $.ajax(url, {
        headers,
        type: 'POST',
        data: JSON.stringify(payload),
        dataType: 'text',
    }).done((response) => {
        console.log('Removed gallery successfully');
    });
}

function addPerson(image) {
    const subject_id = uuidv4();
    const url = 'https://api.kairos.com/enroll';
    const payload = {
        image,
        subject_id,
        gallery_name: 'Hackathon',
    };

    return $.ajax(url, {
        headers,
        type: 'POST',
        data: JSON.stringify(payload),
        dataType: 'text',
    }).done((data) => {
        const parsedData = JSON.parse(data);
        ajaxApi.createPerson(parsedData)
            .then(() => {
                console.log('user created');
            });
        return parsedData;
    });
}

function detectPerson(image) {
    const url = 'https://api.kairos.com/recognize';
    const payload = {
        image,
        gallery_name: 'Hackathon',
    };

    return $.ajax(url, {
        headers,
        type: 'POST',
        data: JSON.stringify(payload),
        dataType: 'text',
    }).done((data) => {
        const parsedData = JSON.parse(data);
        if (parsedData.Errors) {
            console.log('user not found');
            addPerson(image);
        } else {
            console.log('user exist');
        }
    });
}

function getEmotions(image) {
    const url = `https://api.kairos.com/v2/media?source=${image}`;

    return $.ajax(url, {
        headers,
        type: 'POST',
        dataType: 'text',
    }).done((data) => {
        console.log('got emotions');
        return JSON.parse(data);
    });
}
