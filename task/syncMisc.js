// Sunc Misc
module.exports = function (gulp, plugins) {
    return function () {

        plugins.dirSync('app/misc', 'app/src/')
        .on('error', function(err) {
            plugins.notify().write(err);
            this.emit('end');
        });

    };
};
