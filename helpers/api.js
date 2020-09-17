const supertest = require('supertest');

function post(url, endPoint, body, auth) {
    var api = supertest(url);
    var res;
    if(auth){
        res = api.post(`${endPoint}`)
            .send(body)
            .set('Authorization', auth)
            .set('Content-Type', 'application/json');
    } else {
        res = api.post(`${endPoint}`)
            .send(body)
            .set('Content-Type', 'application/json');
    }
    return res;
};

function postUpload(url, endPoint, auth, filePath) {
    var api = supertest(url);
    var res;
    res = api.post(`${endPoint}`)
        .set('Authorization', auth)
        .attach('file', filePath);
    return res;
};

function get(url, endPoint, param, auth) {
    var api = supertest(url);
    var res;
    if(auth){
        if(param){
            res = api.get(`${endPoint}/${param}`)
                .set('Authorization', auth);
        } else {
            res = api.get(`${endPoint}`)
            .set('Authorization', auth);
        }
    } else {
        if(param) {
            res = api.get(`${endPoint}/${param}`);
        } else {
            res = api.get(`${endPoint}`);
        }
    }
    return res;
};

function put(url, endPoint, body, auth, id) {
    var api = supertest(url);
    var res;
    if(auth){
        res = api.put(`${endPoint}/${id}`)
            .send(body)
            .set('Authorization', auth)
            .set('Content-Type', 'application/json');
    } else {
        res = api.post(`${endPoint}`)
            .send(body)
            .set('Content-Type', 'application/json');
    }
    return res;
};


function del(url, endPoint, param, auth) {
    var api = supertest(url);
    var res;
    if(auth){
        res = api.del(`${endPoint}/${param}`)
            .set('Authorization', auth);
    } else {
        res = api.del(`${endPoint}/${param}`);
    }
    return res;
};

module.exports = {
    post,
    get, 
    postUpload,
    del,
    put
}