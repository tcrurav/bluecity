//npx sequelize-cli db:seed:all to insert this data in the tables of the database
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Parkings', [{
        id: 1,
        lat: '28.127729',
        long: '-15.4464768',
        address: 'Av. José Sánchez Peñate, s/n',
        name: 'IES El Rincón',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        lat: '28.1299713',
        long: '-15.4510468',
        address: 'Av. José Sánchez Peñate, s/n',
        name: 'Auditorio Alfredo Kraus',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Parkings', null, {});
    }
  };