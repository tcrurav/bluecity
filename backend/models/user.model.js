module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.BOOLEAN
    }
  });

  User.associate = function (models) {
    User.hasOne(models.box, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "box",
    })
    User.hasOne(models.scooter, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "scooter",
    })
  }

  return User;
};