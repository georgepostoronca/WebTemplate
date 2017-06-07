// Sunc Ico
module.exports = function (gulp, plugins) {
    return function () {

        plugins.dirSync('app/src/ico', 'app/media/ico/')
        .on('error', function(err) {
            plugins.notify().write(err);
            this.emit('end');
        });

    };
};
