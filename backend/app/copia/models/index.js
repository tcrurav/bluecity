const dbConfig = require("../config/config.json");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

// pool: {
//   max: dbConfig.pool.max,
//   min: dbConfig.pool.min,
//   acquire: dbConfig.pool.acquire,
//   idle: dbConfig.pool.idle
// }

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.parkings = require("./parking.model.js")(sequelize, Sequelize);
db.boxes = require("./box.model.js")(sequelize, Sequelize);

// db.parkings.hasMany(db.boxes, {foreignKey: 'fk_parkingid', sourceKey: 'uuid'});
// db.boxes.belongsTo(db.parkings, {foreignKey: 'fk_companyid', targetKey: 'uuid'});

module.exports = db;