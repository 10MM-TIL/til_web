#!/bin/bash
REPOSITORY=/home/ubuntu/deploy
cd "$REPOSITORY"

sudo npm install &&
pm2 describe til-dev > /dev/null
if [ $? -eq 0 ]; then
  echo "til-dev 프로세스가 실행 중입니다."
  sudo npm run pm2:reload:dev
else
# 실행 중이 아닌 경우
  echo "til-dev 프로세스가 실행되지 않았습니다."
  sudo npm run pm2:start:dev
fi