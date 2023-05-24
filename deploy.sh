#!/bin/bash
REPOSITORY=/home/ubuntu/deploy
DEPLOYMENT_GROUP_NAME="${CODE_DEPLOY_DEPLOYMENT_GROUP_NAME}"
cd $REPOSITORY

sudo npm install
if [[ "$DEPLOY_ENVIRONMENT" == "til_fe_prod" ]]; then
  # production 환경인 경우에 대한 처리
  echo "Running commands for production environment"
  sudo npm run pm2:dev
elif [ $DEPLOYMENT_GROUP_NAME = "til_fe_dev" ]; then
  echo "Running commands for development environment"
  sudo npm run pm2:prod
fi