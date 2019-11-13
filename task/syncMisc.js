// Sunc Misc
module.exports = function (gulp, plugins) {
    return function () {

        // plugins.dirSync('app/misc', 'dist/')
        // .on('error', function(err) {
        //     plugins.notify().write(err);
        //     this.emit('end');
		// });

		return gulp.src("app/misc/**/*")
			.pipe(plugins.plumber())
			.pipe(plugins.using({ prefix: 'Sync Misc:', color:'orange', filesize:true }))
			.pipe(gulp.dest("dist/"))
			.pipe(plugins.notify({ message: 'Sync MIisc', onLast: true }))
			.pipe(plugins.browserSync.reload({stream:true}));

    };
};
