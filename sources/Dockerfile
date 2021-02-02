FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install pm2 -g

RUN npm install --production --force

COPY . /app

CMD ["npm","run","start:prod"]
