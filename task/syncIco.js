// Sunc Ico
module.exports = function (gulp, plugins) {
    return function () {

        // plugins.dirSync('app/media/ico/', 'dist/ico')
        // .on('error', function(err) {
        //     plugins.notify().write(err);
        //     this.emit('end');
		// });

		return gulp.src("app/media/ico/**/*")
			.pipe(plugins.plumber())
			.pipe(plugins.using({ prefix: 'Sync ICO:', color:'blue', filesize:true }))
			.pipe(gulp.dest("dist/ico"))
			.pipe(plugins.notify({ message: 'Sync ICO', onLast: true }))
			.pipe(plugins.browserSync.reload({stream:true}));

    };
};
