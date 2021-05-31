//npx sequelize-cli db:seed:all

const BEGIN_OF_TIMES = new Date('1970-01-01 00:00:00');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('scooters', [
            {
                id: 1,
                userId: null,
                boxId: 18,
                lastReservationDate: BEGIN_OF_TIMES,
                createdAt: new Date(),
                updatedAt: new Date()
            },{
                id: 2,
                userId: null,
                boxId: 9,
                lastReservationDate: BEGIN_OF_TIMES,
                createdAt: new Date(),
                updatedAt: new Date()
            },{
                id: 3,
                userId: null,
                boxId: 7,
                lastReservationDate: BEGIN_OF_TIMES,
                createdAt: new Date(),
                updatedAt: new Date()
            },{
                id: 4,
                userId: null,
                boxId: 10,
                lastReservationDate: BEGIN_OF_TIMES,
                createdAt: new Date(),
                updatedAt: new Date()
            },{
                id: 5,
                userId: null,
                boxId: 13,
                lastReservationDate: BEGIN_OF_TIMES,
                createdAt: new Date(),
                updatedAt: new Date()
            },{
                id: 6,
                userId: null,
                boxId: 16,
                lastReservationDate: BEGIN_OF_TIMES,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('scooters', null, {});
    }
};