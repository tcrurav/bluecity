//npx sequelize-cli db:seed:all
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('boxes', [{
        id: 1,
        occupied: true,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        occupied: false,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 3,
        occupied: false,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 4,
        occupied: false,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 5,
        occupied: false,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 6,
        occupied: false,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 7,
        occupied: true,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 8,
        occupied: false,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 9,
        occupied: false,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 10,
        occupied: false,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 11,
        occupied: false,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 12,
        occupied: false,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('boxes', null, {});
    }
  };