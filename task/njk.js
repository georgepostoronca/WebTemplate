module.exports = function (gulp, plugins) {
	return function () {
		var time = new Date().getTime()

		gulp.src(['app/njk/*.njk'])
			.pipe(plugins.plumber())
			// .pipe(plugins.cached('njk', {
			// 	optimizeMemory: true
			// }))
			.pipe(plugins.nunjucksRender({
				path: ['./app/njk/', './app/block/'],
				envOptions: {
					trimBlocks: true,
					lstripBlocks: true
				},
				data: {
					timestamp: time
				}
			})).on('error', function (err) {
				plugins.notify().write(err)
				this.emit('end')
			})
			.pipe(plugins.htmlmin({
				collapseWhitespace: true
			}))
			.pipe(plugins.htmlPrettify({
				indent_size: 4
			}))
			.pipe(gulp.dest('dist/'))
			.pipe(plugins.notify({
				message: 'HTML task complete',
				onLast: true
			}))
			.pipe(plugins.browserSync.reload({
				stream: true
			}))
	}
}
