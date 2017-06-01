module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('app/njk/*.njk')
            .pipe(plugins.notify({ message: 'CSS task complete' }))
            .pipe(gulp.dest('app/src/css/'));
    };
};
