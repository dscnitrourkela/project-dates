FROM node:alpine

WORKDIR /app

COPY sources/package*.json /app/sources/

COPY ./project-elaichi.json /app

RUN cd sources && npm ci

COPY ./sources /app/sources

RUN npm install pm2 -g

CMD ["pm2-runtime","start","sources/index.js","-i","max"]
