module.exports = function (gulp, plugins) {
    return function () {
        var time = new Date().getTime();

        gulp.src(['app/njk/*.njk', 'app/block/*.njk'])
            .pipe(plugins.plumber())
            .pipe(plugins.nunjucksRender({
                path: ['./app/njk/', './app/block/'],
                envOptions: {
                    trimBlocks: true,
                    lstripBlocks: true
                },
                data: {
                    timestamp: time
                }
            })).on('error', function(err) {
    			plugins.notify().write(err);
    			this.emit('end');
    		})
            .pipe(plugins.htmlPrettify({
                indent_size : 4,
            }))
            .pipe(plugins.notify({ message: 'HTML task complete' }))
            .pipe(gulp.dest('app/src/'))
            .pipe(plugins.browserSync.reload({stream:true}));
    };
};
