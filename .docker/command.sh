#!/bin/bash

npm install
git config --global --add safe.directory /home/node/app
sudo npm install -g @nestjs/cli
npx prisma migrate dev
npx prisma db seed
tail -f /dev/null