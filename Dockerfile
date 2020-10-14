FROM node:alpine

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . /app

RUN npm install pm2 -g

CMD ["pm2-runtime","start","sources/index.js","-i","max"]
