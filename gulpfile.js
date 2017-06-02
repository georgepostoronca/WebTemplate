var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    rename: {
        'browser-sync': 'browserSync',
        'gulp-postcss': 'postcss',
    },
    pattern: ['gulp-*', 'gulp.*', 'postcss', 'browser-sync'],
    DEBUG: false
});



// ==========================
// PostCss
// ==========================
var postcss = require('gulp-postcss');
var unprefix = require('postcss-unprefix');
var cssnext = require('postcss-cssnext');
var mqpacker = require("css-mqpacker");
var color_rgba_fallback = require('postcss-color-rgba-fallback');
var opacity = require('postcss-opacity');
var pseudoelements = require('postcss-pseudoelements');
var vmin = require('postcss-vmin');
var pixrem = require('pixrem');
var will_change = require('postcss-will-change');
var atImport = require("postcss-import");
var zindex = require("postcss-zindex");
var lost = require("lost");

var processors = [
	will_change,
	unprefix(),
	cssnext(),
	mqpacker(),
	lost(),
    color_rgba_fallback,
    opacity,
    pseudoelements,
    vmin,
    pixrem,
	atImport(),
	zindex(),
];
// ==========================
// ==========================


console.log(plugins);

function getTask(task) {
    return require('./task/' + task)(gulp, plugins);
}

function getTaskPlg(task, plg) {
    return require('./task/' + task)(gulp, plugins, plg, postcss);
}


// HTML
gulp.task('njk', getTask('njk.js'));

// HTML:Validate
gulp.task('htmlValidate', getTask('htmlValidate.js'));

// CSS
gulp.task('css', getTaskPlg('css.js', processors));

// JS
gulp.task('js', getTask('js.js'));


gulp.task('default', function () {
    gulp.watch('app/njk/**/*.njk', ['njk']);
    gulp.watch('app/scss/**/*.scss', ['css']);
    gulp.watch('app/js/**/*.js', ['js']);
    gulp.watch('app/src/*.html', ['htmlValidate']);
});
