FROM node:alpine

WORKDIR /code

COPY package*.json /code/

RUN npm ci

COPY . /code

RUN npm install pm2 -g

CMD ["pm2-runtime","start","sources/index.js","-i","max"]
