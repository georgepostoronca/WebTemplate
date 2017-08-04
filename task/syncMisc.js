// Sunc Misc
module.exports = function (gulp, plugins) {
    return function () {

        plugins.dirSync('app/misc', 'dist/')
        .on('error', function(err) {
            plugins.notify().write(err);
            this.emit('end');
        });

    };
};
