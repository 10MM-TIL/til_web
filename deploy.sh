#!/bin/bash
cd til_web
git pull origin main
npm install &&
npm run build &&
npm run start &&
pm2 restart til_web