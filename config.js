var config = {};

//java settings
config.java={};
config.java.serverName='dev-node-of5';
config.java.classpath='./metrics/metrics.jar:./metrics/slf4j-api-1.7.2.jar:./metrics/SaksConfig-38.jar:./metrics/config-1.0.0.1.jar';
config.java.configDir='./metrics/config';

//the port for the node server to listen on
config.http={};
config.http.port = '8130';
//config.http.port = '80';

module.exports = config;
