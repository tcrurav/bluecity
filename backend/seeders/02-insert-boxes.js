//npx sequelize-cli db:seed:all

const Constants = require('../constants');

const BEGIN_OF_TIMES = new Date('1970-01-01 00:00:00');

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('boxes', [{
        id: 1,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 3,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 4,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 5,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 6,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 7,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: true,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 8,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 9,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: true,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 10,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: true,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 11,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 12,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 13,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: true,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 14,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 15,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 16,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: true,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 17,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 18,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: true,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 19,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 20,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 21,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 22,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: false,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 23,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: false,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 24,
        state: Constants.NEITHER_PARKING_NOT_RENTING,
        enabled: true,
        occupied: false,
        lastReservationDate: BEGIN_OF_TIMES,
        userId: null,
        parkingId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('boxes', null, {});
    }
  };