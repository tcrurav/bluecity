//npx sequelize-cli db:seed:all

const Constants = require('../constants');

const BEGIN_OF_TIMES = new Date('1970-01-01 00:00:00');

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('boxes', [{
        id: 1,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: true,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 3,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 4,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 5,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 6,
        occupied: false,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 7,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: true,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 8,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 9,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 10,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 11,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 12,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 13,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: true,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 14,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 15,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
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