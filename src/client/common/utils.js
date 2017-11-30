import $ from 'jquery';
import uuidv4 from 'uuid/v4';
import * as ajaxApi from '../api/ajaxApi/ajaxApi';

const headers = {
    app_id: '9bb32a8e',
    app_key: 'f6bcb2638536c9649c161c0351ffe9bc',
};

const gallery_name = 'Hackathon2';

export function processImage(image) {
    return new Promise((resolve, reject) => {
        detectPerson(image)
            .then((data) => {
                resolve(JSON.parse(data));
                // const parsedData = JSON.parse(data);
                // if (parsedData.Errors) {
                //     if (parsedData.Errors[0].ErrCode !== 5002) {
                //         addPerson(image);
                //     }
                // }
                // resolve(parsedData);
            });
    });
}

export function removeGallery() {
    const url = 'https://api.kairos.com/gallery/remove';
    const payload = {
        gallery_name,
    };
    $.ajax(url, {
        headers,
        type: 'POST',
        data: JSON.stringify(payload),
        dataType: 'text',
    }).done((response) => {
        console.log('Removed gallery successfully');
    }).catch((err) => {
        console.log(err);
    });
}

function addPerson(image) {
    const subject_id = uuidv4();
    const url = 'https://api.kairos.com/enroll';
    const payload = {
        image,
        subject_id,
        gallery_name,
    };
    return $.ajax(url, {
        headers,
        type: 'POST',
        data: JSON.stringify(payload),
        dataType: 'text',
    }).done((data) => {
        const parsedData = JSON.parse(data);
        // ajaxApi.createPerson(createPersonDate(parsedData))
        //     .then(() => {
        //         console.log('user created');
        //     });
        return parsedData;
    });
}

function createPersonDate(person) {
    return person.Errors ? {} : {
        personId: person.images[0].transaction.subject_id,
        age: person.images[0].attributes.age,
        gender: person.images[0].attributes.gender.type,
        glasses: person.images[0].attributes.glasses !== 'None',
    };
}

function detectPerson(image) {
    const url = 'https://api.kairos.com/recognize';
    const payload = {
        image,
        gallery_name,
    };

    return new Promise((resolve, reject) => {
        $.ajax(url, {
            headers,
            type: 'POST',
            data: JSON.stringify(payload),
            dataType: 'text',
            success: (res, status, xhr) => resolve(res),
            error: (xhr, status, error) => reject(xhr.responseJSON),
        });
    });
}

export function getCreatives(image) {
    return ajaxApi.getCreatives(createPersonDate(image));
}



