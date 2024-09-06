FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /home/node/app

USER node

ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://user:password@db:5432/nest

CMD [ "/home/node/app/.docker/command.sh" ]