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
            'app/learning/learning.module.js',
            'app/learning/learning.component.js',
            'app/learning/learning.stats.service.js',
            'app/grammar/grammar.module.js',
            'app/grammar/grammar.service.js',
            'app/grammar/grammar.component.js',
            'app/about/about.module.js',
            'app/about/about.component.js'
        ]).pipe(concat('glottai.js'))
            .pipe(babili({ mangle: { keepClassNames: true } }))
            .pipe(ngAnnotate())
            .pipe(gulp.dest('./app'));
    });
}());
