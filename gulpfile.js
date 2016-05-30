var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('compile-ts', function () {
    return gulp.src(['src/app/**/*.ts'])
        .pipe(ts({
            noImplicitAny: true,
            experimentalDecorators: true,
            isolatedModules: true,
            emitDecoratorMetadata: true,
            module: "commonjs"
        }))
        .pipe(gulp.dest('dist/app'));
});
