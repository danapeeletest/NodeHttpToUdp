#!/bin/bash
nohup ~/node/node index.js > httpToUdp.log &
echo $! > $!.pid
