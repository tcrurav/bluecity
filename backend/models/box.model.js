module.exports = (sequelize, Sequelize) => {
  const Box = sequelize.define("box", {
    occupied: {
      type: Sequelize.BOOLEAN
    }
  });

  Box.associate = function(models) {
    Box.belongsTo(models.parking, {
      onDelete: "CASCADE",
      foreignKey: "parkingId",
      as: "parkings",
    })
    Box.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "users",
    })
  }

  return Box;
};