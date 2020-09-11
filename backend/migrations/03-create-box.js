//node_modules/.bin/sequelize db:migrate
//create-post.js
module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable("boxes", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        occupied: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        lastReservationDate: {
          type: Sequelize.DATE,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          references: {
            model: "users",
            key: "id",
            as: "userId",
          },
        },
        parkingId: {
            type: Sequelize.INTEGER,
            onDelete: "CASCADE",
            references: {
              model: "parkings",
              key: "id",
              as: "parkingId",
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
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("boxes"),
  }