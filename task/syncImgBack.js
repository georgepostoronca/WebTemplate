// Sunc Img
module.exports = function (gulp, plugins) {
    return function () {

        plugins.dirSync('app/src/img/', 'app/media/img')
        .on('error', function(err) {
            plugins.notify().write(err);
            this.emit('end');
        });

    };
};
