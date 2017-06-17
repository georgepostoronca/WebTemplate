/*
███    ██  ██████  ████████ ██ ███████ ██    ██
████   ██ ██    ██    ██    ██ ██       ██  ██
██ ██  ██ ██    ██    ██    ██ █████     ████
██  ██ ██ ██    ██    ██    ██ ██         ██
██   ████  ██████     ██    ██ ██         ██
*/

function createNotify(data) {
    var template = '<div class="notify">'+
    '  <div class="notify__close">✖</div>'+
    '	<span class="notify__title">'+
    '		'+ data +
    '	</span>'+
    '</div>';

    $("body").append(template);

}

function Notify() {

    this.info = function(data) {
        type = typeof data;
        if( type == "object") {
            // console.log(data);
            // document.write(JSON.stringify(data));
            // console.log("object");
            // console.log(JSON.stringify(data));
            createNotify(JSON.stringify(data, undefined, 4));
        } else {
            // console.log(data);
            // document.write(data);
            // console.log("Data");
            createNotify(data);
        }
    };

}
var  log = new Notify();

log.info({
    a: "a",
    b: "b",
    c: "c",
});

log.info(["awdwad", "awdwad", "213"]);
