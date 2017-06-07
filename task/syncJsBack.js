// Sunc Js
module.exports = function (gulp, plugins) {
    return function () {

        plugins.dirSync('app/src/js/include/', 'app/js/include/')
        .on('error', function(err) {
            plugins.notify().write(err);
            this.emit('end');
        });

    };
};
