// Sunc Js
module.exports = function (gulp, plugins) {
    return function () {

        // plugins.dirSync('app/js/include', 'dist/js/include')
        // .on('error', function(err) {
        //     plugins.notify().write(err);
        //     this.emit('end');
		// });

		return gulp.src("app/js/include/**/*")
			.pipe(plugins.plumber())
			.pipe(plugins.using({ prefix: 'Sync JS:', color:'yellow', filesize:true }))
			.pipe(gulp.dest("dist/js/include"))
			.pipe(plugins.notify({ message: 'Sync JS', onLast: true }))
			.pipe(plugins.browserSync.reload({stream:true}));

    };
};
