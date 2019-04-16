#!/bin/bash
source /home/ubuntu/.profile
cd /home/ubuntu/acdsampleapp
if which node > /dev/null
then
    echo "node is installed, skipping..."
else
    # add deb.nodesource repo commands 
    # install node
    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi
