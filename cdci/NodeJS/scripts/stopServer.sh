#!/bin/bash
source /home/ubuntu/.profile
cd /home/ubuntu/acdsampleapp

x=`ps -ef | grep node | grep -v grep | awk '{print $1}'`
echo $x
if [ -z "$x" ]
then
      echo "No node process found!"
else
      echo "Node process found!"
      killall node
fi