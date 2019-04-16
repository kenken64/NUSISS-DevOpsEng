#!/bin/bash
source /home/ubuntu/.profile
cd /home/ubuntu/acdsampleapp
NODE_ENV=production npm start > /dev/null 2> /dev/null < /dev/null &