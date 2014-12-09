#!/bin/bash
NODE_CMD=`which node`
SCRIPT=`readlink -f $0`
RUN_DIR=`dirname $SCRIPT`
LOG_DIR=$RUN_DIR/logs
if [ ! -x $LOG_DIR ] 
then
	echo "Creating Log Directory $LOG_DIR"
	mkdir $LOG_DIR	
fi
ROTATE_CMD=$RUN_DIR/node_modules/logrotate-stream/bin/logrotate-stream
set +x
cd $RUN_DIR
$NODE_CMD index.js 2>&1 | $ROTATE_CMD $LOG_DIR/NodeHttpToUdp.log --keep 40 --size '50m' --compress &
echo "NodeHttpToUdp Started"
echo "Log Directory $LOG_DIR/NodeHttpToUdp.log"
