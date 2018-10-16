#!/bin/bash
echo 'Start configuring VM'
echo '----------------------------------------------------------------------------'
apt-get update
apt-get install  --force-yes -y vim
apt-get install  --force-yes -y python-pip python3-pip
curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
bash nodesource_setup.sh
apt-get install  --force-yes -y nodejs
pip install --upgrade pip
pip3 install --upgrade pip
pip3 install -r requirements.txt
cd app/static/
npm install
cp paths.js node_modules/react-scripts/config/paths.js
echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p
cd ~
