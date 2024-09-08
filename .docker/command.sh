#!/bin/bash

npm install
sudo npm install -g @nestjs/cli
npm rebuild bcrypt --build-from-source
git config --global --add safe.directory /home/node/app
npx prisma db push
npx prisma db seed

npm run start:dev

tail -f /dev/null