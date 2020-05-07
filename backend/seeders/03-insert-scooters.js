//npx sequelize-cli db:seed:all
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Scooters', [
            {
                id: 1,
                userId: null,
                boxId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                userId: null,
                boxId: 7,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Scooters', null, {});
    }
};