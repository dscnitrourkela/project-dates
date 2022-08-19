FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ["package*.json", "yarn.lock*", "./"]

RUN npm install --global yarn nodemon --force
RUN yarn install --production --force --silent

# Bundle app source
COPY . .

EXPOSE 8000
CMD [ "node", "app.js" ]