var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

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

var files = ['src/**/*.ts'];

gulp.task('watch', function() {
    gulp.watch('./src/**/*.ts', ['compile-ts']);
});


gulp.task('test', ['watch'], function(){
    var options = {
        script: 'dist/server/app.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },

        //tasks: ['compile-ts'],
        //watch: ['./src/**/*.ts'],

    }

    return nodemon(options).on('restart', function(ev){
        console.log('Restarting ...');
    });
});

gulp.task('test2', function(){
    browserSync.init({
        server: "./dist/server/app.js"
    });


    //gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('serve', ['browser-sync'], function () {
    //gulp.watch("./src/**/*.ts", ['compile-ts']);
});

gulp.task('browser-sync', ['nodemon', 'compile-ts'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        files: ["src/**/*.ts"],
        browser: "google chrome",
        port: 7000,
    });
});

gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: './dist/server/app.js',
        tasks: ['compile-ts']
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});
