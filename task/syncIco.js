// Sunc Ico
module.exports = function (gulp, plugins) {
    return function () {

        plugins.dirSync('app/media/ico/', 'dist/ico')
        .on('error', function(err) {
            plugins.notify().write(err);
            this.emit('end');
        });

    };
};
