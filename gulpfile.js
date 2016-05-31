'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');

const BROWSER_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'dist/server/app.js',
        watch: ['dist/server/app.js']
    })
        .on('start', function onStart() {
            if (!called) { cb(); }
            called = true;
        })
        .on('restart', function onRestart() {
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, BROWSER_RELOAD_DELAY);
        });
});

gulp.task('browser-sync', ['nodemon'], function () {
    browserSync({
        proxy: 'http://localhost:3000',
        port: 4000,
        browser: ['google chrome']
    });
});

gulp.task('compile-ts', function () {
    return gulp.src(['src/**/*.ts'])
        .pipe(ts({
            noImplicitAny: true,
            experimentalDecorators: true,
            isolatedModules: true,
            emitDecoratorMetadata: true,
            module: "commonjs"
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['browser-sync'], function () {
    gulp.watch('src/**/*.ts',   ['compile-ts', browserSync.reload]);
});