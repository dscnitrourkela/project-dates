FROM node:alpine

WORKDIR /app

COPY package.json /app

# COPY ./project-elaichi.json /app

RUN npm install --production

COPY . /app

RUN npm install pm2 -g

CMD ["pm2-runtime","start","index.js","-i","max"]
