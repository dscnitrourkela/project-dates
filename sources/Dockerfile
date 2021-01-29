FROM node:alpine

WORKDIR /app

COPY package.json /app

# COPY ./project-elaichi.json /app

RUN npm install

COPY . /app

RUN npm install pm2 -g

CMD ["pm2-runtime","start","sources/index.js","-i","max"]
