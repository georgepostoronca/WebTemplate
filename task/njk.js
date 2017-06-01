module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('app/njk/*.njk')
            .pipe(plugins.plumber())
            .pipe(plugins.nunjucksRender({
                path: ['./app/njk/'],
                envOptions: {
                    trimBlocks: true,
                    lstripBlocks: true
                }
            })).on('error', function(err) {
    			plugins.notify().write(err);
    			this.emit('end');
    		})
            .pipe(plugins.htmlPrettify({
                indent_size : 4,
            }))
            .pipe(plugins.notify({ message: 'HTML task complete' }))
            .pipe(gulp.dest('app/src/'));
    };
};
