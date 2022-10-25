# FROM node:16
# WORKDIR /usr/src/app
# COPY ["package*.json", "yarn.lock*", "./"]
# COPY tsconfig.json ./
# COPY src ./src
# RUN npm install --global yarn --force
# RUN yarn install
# RUN yarn build
# ## this is stage two , where the app actually runs
# FROM node:16
# WORKDIR /usr/src/app
# COPY package.json ./
# RUN npm install --global yarn --force
# RUN yarn install --production --force --silent
# COPY tsconfig.json ./
# COPY --from=0 /usr/src/app/dist ./dist
# COPY --from=0 /usr/src/app/src/nexus_generated ./src/nexus_generated
# EXPOSE 8000
# CMD [ "yarn", "start" ]
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ["package*.json", "yarn.lock*", "./"]

RUN npm install --global yarn --force
RUN yarn install --force --silent

# Bundle app source
COPY . .

RUN yarn build
EXPOSE 8000
CMD [ "yarn", "start" ]
