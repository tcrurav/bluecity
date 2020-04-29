//node_modules/.bin/sequelize db:migrate
//create-post.js
module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable("Scooters", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          references: {
            model: "Users",
            key: "id",
            as: "userId",
          },
        },
        boxId: {
            type: Sequelize.INTEGER,
            onDelete: "CASCADE",
            references: {
              model: "Boxes",
              key: "id",
              as: "boxId",
            },
          },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("Scooters"),
  }