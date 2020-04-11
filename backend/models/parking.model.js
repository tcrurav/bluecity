module.exports = (sequelize, Sequelize) => {
  const Parking = sequelize.define("parking", {
    lat: {
      type: Sequelize.STRING
    },
    long: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
  });

  Parking.associate = function (models) {
    Parking.hasMany(models.box, {
      foreignKey: "parkingId",
      as: "boxes",
    });
  }

  return Parking;
};