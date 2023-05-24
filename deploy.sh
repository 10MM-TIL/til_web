#!/bin/bash

REPOSITORY=/home/ubuntu/deploy
DEPLOYMENT_GROUP_NAME="${CODE_DEPLOY_DEPLOYMENT_GROUP_NAME}"

cd "$REPOSITORY"
echo "DEPLOYMENT_GROUP_NAME: $DEPLOYMENT_GROUP_NAME"

sudo npm install
if [[ "$DEPLOYMENT_GROUP_NAME" == "til_fe_prod" ]]; then
  # production 환경인 경우에 대한 처리
  echo "Running commands for the production environment"
  sudo npm run pm2:prod
elif [[ "$DEPLOYMENT_GROUP_NAME" == "til_fe_dev" ]]; then
  echo "Running commands for the development environment"
  sudo npm run pm2:dev
fi