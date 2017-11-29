import $ from 'jquery';

const subscriptionKey = 'fb87c7edb03a4449906bf0dd8e4993a1';
const personGroupId = 'smart-ads-board';
const uriBase = 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect';
const params = {
    returnFaceId: true,
    returnFaceLandmarks: false,
    returnFaceAttributes: 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
};
const detectUrl = `${uriBase}?${$.param(params)}`;
const groupListId = 'smart-ads-board';
const initGroupListData = JSON.stringify({
    name: groupListId,
});
const createGroupUrl = `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${groupListId}`;

// Prefer not to use jquery
function sendRequest(url, method, contentType, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey);
    xhr.onload = (res) => {
        callback(res);
    };
    xhr.send(data);
}

function addPersonFace(personId, userData, targetFace, callback) {
    const url = `https://[location].api.cognitive.microsoft.com/face/v1.0/persongroups/${personGroupId}/persons/${personId}/persistedFaces[?${userData}][&${targetFace}]`;
    const data = {

    };
    sendRequest(url, 'POST', 'application/octet-stream', data, callback);
}

export function post(url, data, callback) {
    sendRequest(url, 'POST', 'application/octet-stream', data, callback);
}

export function put(url, data, callback) {
    sendRequest(url, 'PUT', 'application/json; charset=utf-8', data, callback);
}

export function createPerson(name, blob, userData, callback) {
    const url = `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${personGroupId}/persons`;
    const data = JSON.stringify({ name });
    // Create a Person
    sendRequest(url, 'POST', 'application/json; charset=utf-8', data, (res) => {
        debugger;
        // Add a Person Face
        addPersonFace(res[0], blob);
    });
}

export function getPersonIdByFaceId(faceId) {
    const url = 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/identify';
    const data = JSON.stringify({
        faceIds: [faceId],
        personGroupId,
    });
    return new Promise((resolve, reject) => {
        // Identify - return personId
        sendRequest(url, 'POST', 'application/json; charset=utf-8', data, (res) => {
            debugger;
            resolve(res);
        });
    });
}

export function getPerson() {

}

export function initGroupList() {
    sendRequest(createGroupUrl, 'PUT', initGroupListData, {}, (res) => {
        console.log(`response status: ${res.target.status}`);
    });
}
