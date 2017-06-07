// Sunc Js
module.exports = function (gulp, plugins) {
    return function () {

        plugins.dirSync('app/js/include', 'app/src/js/include')
        .on('error', function(err) {
            plugins.notify().write(err);
            this.emit('end');
        });

    };
};
