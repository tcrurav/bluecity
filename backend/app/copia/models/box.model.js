module.exports = (sequelize, Sequelize) => {
  const Box = sequelize.define("box", {
    occupied: {
      type: Sequelize.BOOLEAN
    }
  });

  Box.associate = function(models) {
    Box.belongsTo(models.Parking, {
      onDelete: "CASCADE",
      foreignKey: "parkingId",
    })
  }

  return Box;
};