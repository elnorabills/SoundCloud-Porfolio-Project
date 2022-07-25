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
         {
           name: "Beefy Breath",
           userId: 2,
           previewImage: "imageUrl",
         },
         {
           name: "Taco Bell",
           userId: 3,
           previewImage: "imageUrl",
         },
         {
           name: "For when I have gas",
           userId: 4,
           previewImage: "imageUrl",
         },
         {
           name: "Workout",
           userId: 5,
           previewImage: "imageUrl",
         },
         {
           name: "For a good cry",
           userId: 6,
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
