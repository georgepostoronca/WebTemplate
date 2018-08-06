// SVG
module.exports = function (gulp, plugins) {
	return function () {
		var config = {
			mode: {
				symbol: { // symbol mode to build the SVG
					render: {
						scss: {
							dest: '../../../scss/setings/_sprite.scss',
							template: "app/setings/_sprite_template.scss"
						}
					},
					dest: 'sprite', // destination folder
					prefix: '.svg-%s', // BEM-style prefix if styles rendered
					sprite: 'sprite.svg', //generated sprite name
					example: true // Build a sample page, please!
				}
			},
			svg: {
				xmlDeclaration: true, // Add XML declaration to SVG sprite
				doctypeDeclaration: true, // Add DOCTYPE declaration to SVG sprite
				namespaceIDs: true, // Add namespace token to all IDs in SVG shapes
				namespaceClassnames: true, // Add namespace token to all CSS class names in SVG shapes
				dimensionAttributes: true // Width and height attributes on the sprite
			},
		};

		gulp.src('./app/media/svg/*.svg', {
				cwd: ''
			})
			.pipe(plugins.plumber())
			// .pipe(clean())
			.pipe(plugins.svgmin({
				js2svg: {
					pretty: true
				}
			}))
			// .pipe(plugins.cheerio({
			// 	run: function ($) {
			// 		$('[fill]').removeAttr('fill');
			// 		$('[stroke]').removeAttr('stroke');
			// 		$('[style]').removeAttr('style');
			// 	},
			// 	parserOptions: {xmlMode: true}
			// }))

			.pipe(plugins.replace('&gt;', '>'))

			.pipe(plugins.svgSprite(config))
			.on('error', function (error) {
				/* Do some awesome error handling ... */
				console.log("Error create SVG Sprite:" + error);
			})
			// .pipe(rename("ico.svg"))
			.pipe(gulp.dest('app/media/ico/'));
	};
};
