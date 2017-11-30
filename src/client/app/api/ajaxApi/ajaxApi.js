import $ from 'jquery';

export function getCreatives(person) {
    return new Promise((resolve, reject) => {
        if (!person || typeof person !== 'object') {
            reject(person);
        }
        $.ajax('/getCreatives', {
            method: 'POST',
            data: JSON.stringify(person),
            success: (res, status, xhr) => resolve(res),
            error: (xhr, status, error) => reject(xhr.responseJSON),
        });
    });
}

export function createPerson(person) {
    return new Promise((resolve, reject) => {
        if (!person || typeof person !== 'object') {
            reject(person);
        }
        $.ajax('/createPerson', {
            method: 'POST',
            data: JSON.stringify(person),
            success: (res, status, xhr) => resolve(res),
            error: (xhr, status, error) => reject(xhr.responseJSON),
        });
    });
}

export function setImpression(person, creativeId, like) {
    const data = {
        person,
        creativeId,
        like,
    };
    return new Promise((resolve, reject) => {
        if (!person || (typeof person !== 'object') || !creativeId || (typeof like !== 'boolean')) {
            reject(data);
        }
        $.ajax('/setImpression', {
            method: 'POST',
            data: JSON.stringify(data),
            success: (res, status, xhr) => resolve(res),
            error: (xhr, status, error) => reject(xhr.responseJSON),
        });
    });
}
