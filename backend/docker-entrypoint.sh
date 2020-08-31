#!/bin/sh

# Only for testing purposes
# npx sequelize-cli db:migrate:undo:all

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

npm start