// Sprite PNG
module.exports = function (gulp, plugins) {
    return function () {

        var spriteData = gulp.src('app/media/png/*.png')
		.pipe(plugins.spritesmith({
			imgName: 'spritePng.png',
			cssName: 'spritePng.css',
			padding: 2
		}));
		spriteData.img.pipe(gulp.dest('dist/ico/'));
		spriteData.css.pipe(gulp.dest('app/scss/css/'));

    };
};
