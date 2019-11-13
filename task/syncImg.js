// Sunc Img
module.exports = function (gulp, plugins) {
    return function () {

        // plugins.dirSync('app/media/img/', 'dist/img')
        // .on('error', function(err) {
        //     plugins.notify().write(err);
        //     this.emit('end');
		// });

		return gulp.src("app/media/img/**/*")
			.pipe(plugins.plumber())
			.pipe(plugins.using({ prefix: 'Sync IMG:', color:'violet', filesize:true }))
			.pipe(gulp.dest("dist/img"))
			.pipe(plugins.notify({ message: 'Sync IMG', onLast: true }))
			.pipe(plugins.browserSync.reload({stream:true}));

    };
};
