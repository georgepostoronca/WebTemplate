// BrowserSync
module.exports = function (gulp, plugins) {
	return function () {
		plugins.browserSync.init({
			server: {
				baseDir: "dist"
			},
			port: 3000,
			open: false,
			notify: false,
			logLevel: "info",
			tunnel: false
		});
	};
};
