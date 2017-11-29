import * as ajaxApi from '../api/ajaxApi/ajaxApi';

export function detectFace(url, blob) {
    return new Promise((resolve, reject) => {
        ajaxApi.post(url, blob, (res) => {
            resolve(res);
        });
    });
}
