#!/bin/bash
REPOSITORY=/home/ubuntu/deploy
cd $REPOSITORY

sudo npm install &&
sudo npm run start:dev &&
sudo pm2 restart deploy


