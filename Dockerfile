FROM node:18.19.0-alpine3.17

ENV TZ=Asia/Bangkok

WORKDIR /app/service-nest-sx

COPY ./service-nest-sx/package.json ./
COPY ./service-nest-sx/docker-entrypoint.sh ./

RUN npm install
RUN npm i -g typeorm ts-node

COPY ./service-nest-sx ./

COPY .env ./

RUN ["chmod", "+x", "/app/service-nest-sx/docker-entrypoint.sh"]

CMD ["npm", "run", "start"]