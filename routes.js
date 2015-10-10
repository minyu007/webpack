'use strict';

var proxy = require('koa-proxy');

var list = require('./mock/data');

module.exports = function(router, app) {
    // mock api
    router.get('/api/data', function*() {
        var query = this.query || {};
        var offset = query.offset || 0;
        var limit = query.limit || 10;
        var diff = limit - list.length;

        if (diff <= 0) {
            this.body = {
                code: 0,
                data: list.slice(0, limit)
            };
        } else {
            var arr = list.slice(0, list.length);
            var i = 0;

            while (diff--) arr.push(arr[i++]);

            this.body = {
                code: 0,
                data: arr
            };
        }
    });

    // 解决 ajax 跨域
    router.get('/handl-front/hello', proxy({
        url: 'http://192.168.1.17:8080/handl-front/hello'
    }));
};