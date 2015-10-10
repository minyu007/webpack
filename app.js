'use strict';
var http = require('http');
var path = require('path');

var koa = require('koa');
var router = require('koa-router')();
var serve = require('koa-static');
var colors = require('colors');

var pkg = require('./package.json');
var env = process.env.NODE_ENV;
var debug = !env || env === 'development';
var viewDir = debug ? 'src' : 'build';

var routes = require('./routes');

var app = koa();

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

app.keys = [pkg.name, pkg.description];
app.proxy = true;

app.on('error', function(err, ctx) {
    err.url = err.url || ctx.request.url;
    console.error(err, ctx);
});

app.use(function*(next) {
    if (this.url.match(/favicon\.ico$/)) this.body = '';
    yield next;
});

app.use(function*(next) {
    console.log(this.method.info, this.url);
    yield next;
});

routes(router, app);
app.use(router.routes());

if (debug) {
    var webpackDevMiddleware = require('koa-webpack-dev-middleware');
    var webpack = require('webpack');
    var webpackConf = require('./webpack.config')();

    app.use(webpackDevMiddleware(webpack(webpackConf), {
        contentBase: webpackConf.output.path,
        publicPath: webpackConf.output.publicPath,
        hot: true,
        stats: {
            cached: false,
            colors: true
        }
    }));
}

app.use(serve(path.resolve(__dirname, viewDir), {
    maxage: 0
}));

app = http.createServer(app.callback());

app.listen(3000, '0.0.0.0', function() {
    console.log('app listen success. you can access "http://localhost/3000/a.html"');
});