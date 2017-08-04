// HTML Validate
module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('dist/*.html')
        .pipe(plugins.w3cjs());
    };
};
