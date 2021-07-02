const Constants = require('../constants');

module.exports = (sequelize, Sequelize) => {
  const Box = sequelize.define("box", {
    state: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: Constants.BOX_EMPTY_DOOR_CLOSED
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    occupied: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    lastReservationDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date('1970-01-01 00:00:00')
    }
  });

  Box.associate = function (models) {
    Box.belongsTo(models.parking, {
      onDelete: "CASCADE",
      foreignKey: "parkingId",
      as: "parkings",
    })
    Box.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "user",
    })
  }

  return Box;
};