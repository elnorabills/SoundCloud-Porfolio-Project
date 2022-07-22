'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert(
       "Playlists",
       [
         {
           name: "Hot Garbage",
           userId: 1,
           previewImage: "imageUrl",
         },
         {
           name: "Sweaty Foot",
           userId: 2,
           previewImage: "imageUrl",
         },
       ],
       {}
     );

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Playlists', null, {});

  }
};
