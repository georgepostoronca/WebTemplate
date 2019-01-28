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
var sortCSSmq = require('sort-css-media-queries');

var processors = [
	will_change,
	unprefix(),
	cssnext(),
	mqpacker({
		sort: sortCSSmq.desktopFirst
	}),
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


// console.log(plugins);

function getTask(task) {
	return require('./task/' + task)(gulp, plugins);
}

function getTaskPlg(task, plg) {
	return require('./task/' + task)(gulp, plugins, plg, postcss);
}

function getTaskSet(task, plg) {
	return require('./task/' + task)(gulp, plugins, plg);
}


// ==============================
// Generate ListPage
// ==============================
// gulp.task("listPages", function() {
// 	var folder = "./dist/";
// 	var list = [];
// 	fs.readdirSync(folder).forEach(file => {
// 		var m = file.split(".");

// 		if (m[1] == "html") {
// 			list.push(file)
// 		}
// 	})

// 	gulp.src('app/njk/inc/list-page.njk')
// 		.pipe(plugins.plumber())
// 		.pipe(plugins.nunjucksRender({
// 			path: ['./app/njk/inc'],
// 			envOptions: {
// 				trimBlocks: true,
// 				lstripBlocks: true
// 			},
// 			data: {
// 				pages: list
// 			}
// 		})).on('error', function (err) {
// 			plugins.notify().write(err)
// 			this.emit('end')
// 		})
// 		.pipe(gulp.dest('dist/'));
// });
// ==============================
// ==============================

// HTML
gulp.task('njk', getTask('njk.js'));

// HTML:Validate
gulp.task('htmlValidate', getTask('htmlValidate.js'));

// CSS
gulp.task('css', getTaskPlg('css.js', processors));

// JS
var webpackStream = require('webpack-stream');
// gulp.task('js', getTaskSet('js.js', webpackStream));
gulp.task('js', function () {
	return gulp.src('app/js/main.js')
		.pipe(plugins.plumber())
		.pipe(webpackStream({
			// mode: 'production',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['env']
            }
          }
        ]
      },
      // externals: {
      //   jquery: 'jQuery'
      // }
    }))
    .pipe(gulp.dest('./dist/js'))
    // .pipe(plugins.uglify())
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'));
});



// Sync Ico
gulp.task('syncIco', getTask('syncIco.js'));

// Sync Img
gulp.task('syncImg', getTask('syncImg.js'));

// Sync Js
gulp.task('syncJs', getTask('syncJs.js'));

// Sync Misc
gulp.task('syncMisc', getTask('syncMisc.js'));

// Sprite SVG
gulp.task('svg', getTask('svg.js'));

// Sprite PNG
gulp.task('png', getTask('png.js'));

// BrowserSync
gulp.task('browserSync', getTaskSet('browserSync.js'));


gulp.task('watcher', function () {
	gulp.watch(['app/njk/**/*.njk', 'app/block/**/*.njk'], ['njk', 'listPages']);
	gulp.watch(['app/scss/**/*.scss', 'app/block/**/*.scss'], ['css']);
	gulp.watch(['app/js/**/*.js', 'app/block/**/*.js'], ['js']);
	gulp.watch('app/src/*.html', ['htmlValidate']);

	// Sync Ico
	gulp.watch('app/media/ico/*', ['syncIco']);

	// Sync Img
	gulp.watch('app/media/img/*', ['syncImg']);

	// Sync JS
	gulp.watch('app/js/include/*', ['syncJs']);

	// Sprite SVG
	gulp.watch('app/media/svg/*.svg', ['svg', 'syncIco']);

	// Sprite PNG
	gulp.watch('app/media/png/*.png', ['png', 'syncIco']);
});

gulp.task("start", ["njk", "css", "js", "syncIco", "syncImg", "syncJs", "syncMisc"]);

gulp.task('default', ['watcher', 'start', 'browserSync']);
