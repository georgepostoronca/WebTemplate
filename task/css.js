module.exports = function (gulp, plugins, plg, postcss) {
    return function () {
        gulp.src('app/scss/main.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.using({ prefix: 'After changed:', color:'blue', filesize:true }))
        .pipe(plugins.sourcemaps.init())

        // CSS
        .pipe(plugins.cssGlobbing({
            extensions: ['.css', '.scss'],
            autoReplaceBlock: {
            	onOff: false,
            	globBlockBegin: 'cssGlobbingBegin',
            	globBlockEnd: 'cssGlobbingEnd'
            }
        }))

        // SCSS
        .pipe(plugins.sass({
            outputStyle: 'expanded',
            sourceMap: true,
            errLogToConsole: true,
        }).on('error', function(err) {
            plugins.notify().write(err);
            this.emit('end');
        }))

        // PostCss
        .pipe(postcss(plg))

        // AutoPrefixer
        .pipe(plugins.autoprefixer({
            browsers: ['last 16 versions', 'ie >= 9'],
            cascade: false
        }))

        .pipe(plugins.cssbeautify())
        .pipe(plugins.stripCssComments())
        .pipe(plugins.sourcemaps.write("./"))
        .pipe(gulp.dest("dist/css/"))


        // Minify
        // .pipe(plugins.rename({suffix: '.min'}))
        // .pipe(plugins.csso())
        // .pipe(gulp.dest('app/src/css/'))


        .pipe(plugins.notify({ message: 'CSS task complete', onLast: true }))
        .pipe(plugins.browserSync.reload({stream:true}));
    };
};
