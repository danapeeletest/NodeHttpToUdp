var config = require('./config');
var java = require('java');
java.classpath.push(config.java.classpath);
java.options.push('-Denv=' + config.java.serverName);
java.options.push('-DconfigDir=' + config.java.configDir);

function route(url, httpVerb, message) {
    switch(url) {
        case '/sendUdpMessage':
            if (httpVerb === "POST" && message) {
                sendUdpMessage(message.split("\n"));
            }
            break;       
    }
}

function getMethodName(metricType) {
  var methodName = 'incrementBy';
  switch (metricType) {
    case 'ms':
      methodName = 'time';
      break;
    case 'g':
      methodName = 'gauge';
      break;
  }
  return methodName;
}

function sendUdpMessage(messages) {
    messages.forEach(function (message) {
        var splitMetricType = message.split('|');
	if (splitMetricType.length == 2) {
          var metricType = splitMetricType[1];
	  var splitMetricBuckets = splitMetricType[0].split(':');
	  if (splitMetricBuckets.length == 2) {
	    var metricBuckets = splitMetricBuckets[0];
	    var metricValue = java.newInstanceSync("java.lang.Long", splitMetricBuckets[1]);
	    var methodName = getMethodName(metricType);
	    java.callStaticMethod('com.s5a.metrics.Recorder',
		                  methodName,
				  metricBuckets, 
				  Number(metricValue), 
				  function (err, bytes) {
              if (err) {
                console.log('Error: ' + err);
              } else { 
                console.log('Sent bucket: ' + metricBuckets + ', value: ' + metricValue + ', method: ' + methodName  + ' to environment: ' + config.java.serverName);
              }
            });
	  }
        } 
    });
}

exports.route = route;
