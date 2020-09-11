//npx sequelize-cli db:seed:all

const BEGIN_OF_TIMES = new Date('1970-01-01 00:00:00');

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('boxes', [{
        id: 1,
        occupied: true,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 3,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 4,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 5,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 6,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 7,
        occupied: true,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 8,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 9,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 10,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 11,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 12,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 13,
        occupied: true,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 14,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 15,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('boxes', null, {});
    }
  };