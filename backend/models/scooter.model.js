module.exports = (sequelize, Sequelize) => {
  const Scooter = sequelize.define("scooter", {
    lastReservationDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date('1970-01-01 00:00:00')
    }
  });

  Scooter.associate = function (models) {
    Scooter.belongsTo(models.box, {
      onDelete: "CASCADE",
      foreignKey: "boxId",
      as: "box",
    });
    Scooter.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "user",
    })
  }

  return Scooter;
};