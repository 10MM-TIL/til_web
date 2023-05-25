#!/bin/bash
REPOSITORY=/home/ubuntu/deploy
DESTINATION=/home/ubuntu/prod

if [ "$DEPLOYMENT_GROUP_NAME" == "til_fe_prod" ]; then
  cp -fr "$REPOSITORY" "$DESTINATION"
fi