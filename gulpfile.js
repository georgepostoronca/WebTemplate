var gulp = require('gulp');
var fs = require("fs");
var plugins = require('gulp-load-plugins')({
    rename: {
        'browser-sync': 'browserSync',
        'gulp-postcss': 'postcss',
    },
    pattern: ['gulp-*', 'gulp.*', 'postcss', 'browser-sync'],
    DEBUG: false
});
var json = JSON.parse(fs.readFileSync('./host.json'));
var first = 0;


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
var sorting = require("postcss-sorting");

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
    sorting()
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

function getTaskSet(task, plg) {
    return require('./task/' + task)(gulp, plugins, json);
}


// HTML
gulp.task('njk', getTask('njk.js'));

// HTML:Validate
gulp.task('htmlValidate', getTask('htmlValidate.js'));

// CSS
gulp.task('css', getTaskPlg('css.js', processors));

// JS
gulp.task('js', getTask('js.js'));

// Sync Ico
gulp.task('syncIco', getTask('syncIco.js'));
gulp.task('syncIcoBack', getTask('syncIcoBack.js'));

// Sync Img
gulp.task('syncImg', getTask('syncImg.js'));
gulp.task('syncImgBack', getTask('syncImgBack.js'));

// Sync Js
gulp.task('syncJs', getTask('syncJs.js'));
gulp.task('syncJsBack', getTask('syncJsBack.js'));

// Sync Misc
gulp.task('syncMisc', getTask('syncMisc.js'));

// Sprite SVG
gulp.task('svg', getTask('svg.js'));

// Sprite PNG
gulp.task('png', getTask('png.js'));

// BrowserSync
gulp.task('browserSync', getTaskSet('browserSync.js'));


gulp.task('watcher', function () {
    gulp.watch(['app/njk/**/*.njk', 'app/block/**/*.njk'], ['njk']);
    gulp.watch(['app/scss/**/*.scss', 'app/block/**/*.scss'], ['css']);
    gulp.watch(['app/js/**/*.js', 'app/block/**/*.js'], ['js']);
    gulp.watch('app/src/*.html', ['htmlValidate']);

    // Sync Ico
    gulp.watch('app/media/ico/*', ['syncIco']);
    // gulp.watch('app/src/ico/*', ['syncIcoBack']);

    // Sync Img
    gulp.watch('app/media/img/*', ['syncImg']);
    // gulp.watch('app/src/img/*', ['syncImgBack']);

    // Sync JS
    gulp.watch('app/js/include/*', ['syncJs']);
    // gulp.watch('app/src/js/include/*', ['syncJsBack']);

    // Sprite SVG
    gulp.watch('app/media/svg/*.svg', ['svg', 'syncIco']);

    // Sprite PNG
    gulp.watch('app/media/png/*.png', ['png', 'syncIco']);
});

gulp.task("start", ["njk", "css", "js", "syncIco", "syncImg", "syncJs", "syncMisc"]);

gulp.task('default', ['watcher','start', 'browserSync']);
