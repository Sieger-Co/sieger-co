// const critical = require('critical');
//
// function defaultTask(cb) {
//     // place code for your default task here
//     critical.generate({
//         inline: true,
//         base: 'test/',
//         src: 'index.html',
//         target: {
//             css: 'critical.css',
//             html: 'index-critical.html',
//             uncritical: 'uncritical.css',
//         },
//     });
//     cb();
// }
//
// exports.default = defaultTask

const gulp = require('gulp');
const log = require('fancy-log');
const critical = require('critical').stream;
const using = require('gulp-using')

// Generate & Inline Critical-path CSS
gulp.task('critical', () => {
    return gulp
        .src(['non-critical/**/*.html'], {base: './'})
        .pipe(using())
        .pipe(
            critical({
                base: './',
                inline: true,
                dimensions: [
                    { height: 200, width: 500 },
                    { width: 770, height: 1000 },
                    { height: 1000, width: 1200 },
                ],
                css: ['assets/css/combined.css'],
            })
        )
        .on('error', err => {
            log.error(err.message);
        })
        .pipe(gulp.dest('dist'));
});