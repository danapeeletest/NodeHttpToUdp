var config = {};

//java settings
config.java={};
config.java.serverName='dev-of5';
config.java.classpath='./metrics';
config.java.configDir='/Users/921882/git/NodeHttpToUdp/metrics/config';

//the port for the node server to listen on
config.http={};
config.http.port = '8130';
//config.http.port = '80';

module.exports = config;
