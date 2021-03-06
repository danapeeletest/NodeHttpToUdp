Simple Node Web Service for sending UDP protocol message via HTTP
==============

Purpose
--------------

This server is meant to run in conjunction with a UDP server. It's purpose is to receive HTTP requests on the specified port and send them via UDP to the UDP server at the specified host and port.
Requirements
--------------
NodeJs installed
Java JDK
internet access

Setup
--------------
  
- Clone this repository
- Configure the listener port and the metrics.jar environment you want to use (prod-node-of5, qa-node-of5, dev-node-of5) in the config.js file (NOTE- Demandware has a firewall which prevents outgoing HTTP requests to any port except 80. If you want to use another port then you need to make a request to Demandware support to open that port.)
- Run npm install
- Extract the jars and configuration files from the tarball - tar -xvf metrics.tar
- Start the server: node index.js 2>&1 | node_modules/logrotate-stream/bin/logrotate-stream NodeHttpToUdp.log --keep 40 --size '50m' --compress &

Usage
------------

- Send messages to the server by passing them in the body of a POST request 
- URL: http://localhost:8888/sendUdpMessage
- You can send multiple messages to the node server by separating them with the newline character ("\n")

Logging
-------------

The log will be available at httpToUdp.log
