
var Pusher = require('pusher');
function emit(channels, event, data, socketId, callback) {
    var pusher = new Pusher({
        appId: '314259',
        key: 'b4e90658802c72cfb6ad',
        secret: '2c22a4d89e483917c130',
        cluster: 'ap1', // optional, if `host` is present, it will override the `cluster` option.
    });
    pusher.trigger(channels, event, data, socketId, function (error, request, response) {
        if (error) {
            console.log('emit failed for channel ' + channels + ', event: ' + event + ', detail: ' + error);
        } else {
            console.log('emit successful for channel ' + channels + ', event: ' + event + ', detail: ' + response);
        }
    });
}

module.exports = {
    emit: emit
};

