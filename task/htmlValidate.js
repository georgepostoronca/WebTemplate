// HTML Validate
module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('app/src/*.html')
        .pipe(plugins.w3cjs());
    };
};
