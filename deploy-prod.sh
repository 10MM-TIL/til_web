#!/bin/bash
REPOSITORY=/home/ubuntu/deploy
cd "$REPOSITORY"

sudo npm install &&
pm2 describe til-product > /dev/null
if [ $? -eq 0 ]; then
  # 실행 중인 경우
  echo "til-product 프로세스가 실행 중입니다."
  sudo npm run pm2:reload:prod
else
  # 실행 중이 아닌 경우
  echo "til-product 프로세스가 실행되지 않았습니다."
  sudo npm run pm2:start:prod
fi
    
