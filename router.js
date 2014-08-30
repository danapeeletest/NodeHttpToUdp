var dgram = require('dgram');
var config = require('./config');
var server = config.udp.servername;
var port = config.udp.port;

function route(url, message) {
    switch(url) {
        case '/sendUdpMessage':
            sendUdpMessage(message.split("\n"));
            break;       
    }
}

function sendUdpMessage(messages) {
    var messageBuffer = new Buffer(messages[0]);
    var client = dgram.createSocket('udp4');
    client.send(messageBuffer, 0, messageBuffer.length, port, server, function (err, bytes) {
        client.close();
        if (err) {
            console.log('Error: ' + err);
        } else { 
            console.log('Sent ' + messageBuffer.toString() + ' to ' + server + ':' + port);
            if (messages.length > 1) {
                sendUdpMessage(messages.slice(1,messages.length));
            }
        }
    });
}

exports.route = route;
