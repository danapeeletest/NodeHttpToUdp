#!/bin/bash
for pid in `ls *.pid`
do
	kill `cat $pid`
	rm $pid
done
