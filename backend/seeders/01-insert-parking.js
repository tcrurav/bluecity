//npx sequelize-cli db:seed:all to insert this data in the tables of the database
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('parkings', [{
        id: 1,
        lat: '28.127729',
        long: '-15.4464768',
        address: 'Av. José Sánchez Peñate, s/n, 35001 Las Palmas de GC',
        name: 'IES El Rincón',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        lat: '28.1299713',
        long: '-15.4510468',
        address: 'Av. José Sánchez Peñate, s/n, 35001 Las Palmas de GC',
        name: 'Auditorio Alfredo Kraus',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 3,
        lat: '28.003293',
        long: '-15.4160894',
        address: 'Plaza de San Juan, 35200 Telde',
        name: 'Basílica de San Juan Bautista',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 4,
        lat: '41.4107854',
        long: '2.0247707',
        address: 'Carrer Ntra. Sra. de Lourdes, 34, 08750 Molins de Rei',
        name: 'Institut Bernat el Ferrer',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 5,
        lat: '41.3558269',
        long: '2.0752466',
        address: 'Carrer Bonavista, 70, 08940 Cornellà de Llobregat',
        name: 'Institut Esteve Terradas i Illa',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 6,
        lat: '38.997992',
        long: '-3.919667',
        address: 'Instituto de Tecnologías y Sistemas de Información, Camino de Moledores, S/N, Oficina 0.07, 13071 Ciudad Real',
        name: 'Furious Koalas',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 7,
        lat: '41.3603711',
        long: '2.0611996',
        address: 'Plaça de Can Suris, s/n, 08940 Cornellà de Llobregat',
        name: 'Citilab',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 8,
        lat: '28.1411781',
        long: '-15.4298421',
        address: 'Muelle de Sta. Catalina, 35007 Las Palmas de Gran Canaria',
        name: 'Museo Elder',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('parkings', null, {});
    }
  };