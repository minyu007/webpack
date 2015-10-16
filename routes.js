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
        

       setTimeout(function(){
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
         }, 5000)
    });

    // 解决 ajax 跨域
    router.get('/handl-front/courses', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses'
    }));
    router.get('/handl-front/courses/:courseId', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId'
    }));
    router.get('/handl-front/courses/:courseId/books', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId/books'
    }));
    router.get('/handl-front/courses/:courseId/books/:bookId', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId/books/:bookId'
    }));
    router.get('/handl-front/courses/:courseId/books/:bookId/readings', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId/books/:bookId/readings'
    }));
    router.get('/handl-front/courses/:courseId/books/:bookId/readings/:readingId', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId/books/:bookId/readings/:readingId'
    }));
    router.get('/handl-front/courses/:courseId/books/:bookId/readings/:readingId/subjects', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId/books/:bookId/readings/:readingId/subjects'
    }));
    router.get('/handl-front/courses/:courseId/books/:bookId/readings/:readingId/subjects/:subjectId', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId/books/:bookId/readings/:readingId/subjects/:subjectId'
    }));

    router.post('/handl-front/courses', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses'
    }));
    router.post('/handl-front/courses/:courseId', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId'
    }));
    router.post('/handl-front/courses/:courseId/books', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId/books'
    }));
    router.post('/handl-front/courses/:courseId/books/:bookId', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId/books/:bookId'
    }));
    router.post('/handl-front/courses/:courseId/books/:bookId/readings', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId/books/:bookId/readings'
    }));
    router.post('/handl-front/courses/:courseId/books/:bookId/readings/:readingId', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId/books/:bookId/readings/:readingId'
    }));
    router.post('/handl-front/courses/:courseId/books/:bookId/readings/:readingId/subjects', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId/books/:bookId/readings/:readingId/subjects'
    }));
    router.post('/handl-front/courses/:courseId/books/:bookId/readings/:readingId/subjects/:subjectId', proxy({
        url: 'http://192.168.1.17:8080/handl-front/courses/:courseId/books/:bookId/readings/:readingId/subjects/:subjectId'
    }));

    router.get('/handl-front/j_spring_security_check', proxy({
        url: 'http://192.168.1.17:9090/handl-front/j_spring_security_check'
    }));
};