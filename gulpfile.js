var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function () {
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
