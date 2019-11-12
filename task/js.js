// JS
module.exports = function (gulp, plugins , webpackStream) {
    return function () {
		return gulp.src("app/js/main.js")
			.pipe(plugins.plumber())
			.pipe(plugins.using({ prefix: 'After changed:', color:'orange', filesize:true }))

			// Include
			.pipe(plugins.include())

			// Dest
			.pipe(gulp.dest("dist/js/"))

			// Uglify
			.pipe(plugins.uglify())
			.pipe(plugins.rename({suffix: ".min"}))
			.pipe(gulp.dest("dist/js"))
			.pipe(plugins.browserSync.reload({stream:true}));

			// .pipe(webpackStream({
			// 	mode: 'production',
			// 	output: {
			// 		filename: 'app.js',
			// 	},
			// 	module: {
			// 		rules: [
			// 			{
			// 				test: /\.(js)$/,
			// 				exclude: /(node_modules)/,
			// 				loader: 'babel-loader',
			// 				query: {
			// 					presets: ['env']
			// 				}
			// 			}
			// 		]
			// 	},
			// 	// externals: {
			// 	//   jquery: 'jQuery'
			// 	// }
			// }))
			// .pipe(gulp.dest('./public/'))
			// .pipe(plugins.uglify())
			// .pipe(plugins.rename({ suffix: '.min' }))
			// .pipe(gulp.dest("dist/js"))
			// .pipe(plugins.browserSync.reload({stream:true}));
    };
};
