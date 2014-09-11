var config = {};

//The server and port to send the udp message to
config.udp={};
config.udp.servername = 'localhost';
config.udp.port = '8125';

//the port for the node server to listen on
config.http={};
config.http.port = '8130';
//config.http.port = '80';

module.exports = config;
