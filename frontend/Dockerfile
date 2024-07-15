FROM node:16.19.0

# Create app directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
#Only for developing
#ENV PATH /usr/src/app/node_modules/.bin:$PATH

# ALTERNATIVE FOR BUILD
#COPY build ./

#RUN npm install -g serve

#EXPOSE 3000

#ENTRYPOINT [ "serve", "-s", "build", "-l", "3000" ]

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# RUN npm rebuild node-sass
# RUN npm install react-scripts@3.4.1 -g --silent

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#Only for developping
COPY . ./

# COPY build ./
# COPY server ./

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]

# pull official base image
#FROM node:13.12.0-alpine

# set working directory
#WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
#COPY package.json ./
#COPY package-lock.json ./
#RUN npm install --silent
#RUN npm install react-scripts@3.4.1 -g --silent

# add app
#COPY . ./

# start app
#CMD ["npm", "start"]