'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert(
       "Playlists",
       [
         {
           name: "Hot Garbage",
           userId: 1,
           imageUrl: "imageUrl",
         },
         {
           name: "Sweaty Foot",
           userId: 2,
           imageUrl: "imageUrl",
         },
       ],
       {}
     );

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Playlists', null, {});

  }
};
