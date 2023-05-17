#!/bin/bash
REPOSITORY=/home/ubuntu/deploy
cd $REPOSITORY

sudo npm install &&
sudo pm2 restart deploy