var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

console.log(plugins);

function getTask(task) {
    return require('./task/' + task)(gulp, plugins);
}


// HTML
gulp.task('njk', getTask('njk.js'));

// CSS
gulp.task('css', getTask('css.js'));

gulp.task('default', function () {
    gulp.watch('app/njk/**/*.njk', ['njk']);
    gulp.watch('app/scss/**/*.{scss,sass}', ['css']);
});
