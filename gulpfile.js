'use strict';

var gulp = require('gulp');
var webpack = require('webpack');

var gutil = require('gulp-util');

var webpackConf = require('./webpack.config')({
    debug: false
});

var src = process.cwd() + '/src';
var build = process.cwd() + '/build';

gulp.task('clean', function() {
    var clean = require('gulp-clean');
    return gulp.src(build, {
        read: true
    }).pipe(clean());
});

gulp.task('pack', ['clean'], function(done) {
    webpack(webpackConf, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true
        }));
        done();
    });
});

// html process
gulp.task('default', ['pack'], function() {
    var replace = require('gulp-replace');
    var htmlmin = require('gulp-htmlmin');

    return gulp
        .src(build + '/*.html')
        .pipe(replace(/<script(.+)?data-debug([^>]+)?><\/script>/g, ''))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(build));
});