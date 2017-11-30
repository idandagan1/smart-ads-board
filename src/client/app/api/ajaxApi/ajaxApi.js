import $ from 'jquery';

export function getCreatives(person) {
    return new Promise((resolve, reject) => {
        if (!person || typeof person !== 'object') {
            reject(person);
        }
        $.ajax('api/getCreatives', {
            method: 'POST',
            data: JSON.stringify(person),
            contentType: "application/json",
            success: (res, status, xhr) => resolve(res),
            error: (xhr, status, error) => reject(xhr.responseJSON)
        });
    });
}

export function createPerson(person) {
    return new Promise((resolve, reject) => {
        if (!person || typeof person !== 'object') {
            reject(person);
        }
        $.ajax('api/person', {
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(person),
            success: (res, status, xhr) => resolve(res),
            error: (xhr, status, error) => reject(xhr.responseJSON)
        });
    });
}

export function setImpression(person, creativeId, like) {
    const data = {
        person,
        creativeId,
        like
    };
    return new Promise((resolve, reject) => {
        if (!person || (typeof person !== 'object') || !creativeId || (typeof like !== 'boolean')) {
            reject(data);
        }
        $.ajax('api/impression', {
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: (res, status, xhr) => resolve(res),
            error: (xhr, status, error) => reject(xhr.responseJSON)
        });
    });
}
