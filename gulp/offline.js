
'use strict';

var gulp = require('gulp');
var swPrecache = require('sw-precache');

var paths = gulp.paths;

gulp.task('generate-service-worker', function(callback) {
    swPrecache.write(paths.dist + '/service-worker.js', {
        staticFileGlobs: [paths.dist + '/**/*.{js,json,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
        stripPrefix: paths.dist,
        runtimeCaching: [
            {
                urlPattern: new RegExp('/fonts'),
                handler: 'cacheFirst',
            }
        ]
    }, callback);
});