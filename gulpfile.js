(function () {
    "use strict";

    const gulp = require('gulp');
    const concat = require('gulp-concat');
    const ngAnnotate = require('gulp-ng-annotate');
    const babili = require('gulp-babili');

    gulp.task('js', () => {
        gulp.src([
            'app/app.module.js',
            'app/app.config.js',
            'app/app.constants.js',
            'app/**/*.module.js',
            'app/**/*.component.js',
            'app/**/*.service.js',
        ]).pipe(concat('glottai.js'))
            .pipe(babili({ mangle: { keepClassNames: true } }))
            .pipe(ngAnnotate())
            .pipe(gulp.dest('./app'));
    });
}());
