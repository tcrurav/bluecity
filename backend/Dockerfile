FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000

# Only for testing purposes
# RUN npx sequelize-cli db:migrate:undo:all

# Migration
# RUN [ "npx", "sequelize-cli", "db:migrate" ]
# RUN [ "npx", "sequelize-cli", "db:seed:all" ]

# ENTRYPOINT [ "npm", "start" ]

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]