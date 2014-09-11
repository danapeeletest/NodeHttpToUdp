var dgram = require('dgram');
var config = require('./config');
var async = require('async');
var server = config.udp.servername;
var port = config.udp.port;

function route(url, httpVerb, message) {
    switch(url) {
        case '/sendUdpMessage':
            if (httpVerb === "POST" && message) {
                sendUdpMessage(message.split("\n"));
            }
            break;       
    }
}

function sendUdpMessage(messages) {
    async.mapSeries(messages, function (message, callback) {
        var messageBuffer = new Buffer(message);
        var client = dgram.createSocket('udp4');
        client.send(messageBuffer, 0, messageBuffer.length, port, server, function (err, bytes) {
            client.close();
            if (err) {
                console.log('Error: ' + err);
            } else { 
                console.log('Sent ' + message + ' to ' + server + ':' + port);
            }
	    callback(err, message);
        });
    }, function (err, transformed) {
            if (err) {
                console.log('Error: ' + err);
            } else { 
                console.log('Sent all message successfully at ' + new Date());
            }
    });
}

exports.route = route;
