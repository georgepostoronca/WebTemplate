// BrowserSync
module.exports = function (gulp, plugins) {
	return function () {
		plugins.browserSync.init({
			server: {
				baseDir: "dist"
			},
			port: 8080,
			open: false,
			notify: false,
			logLevel: "info",
			tunnel: false
		});
	};
};
