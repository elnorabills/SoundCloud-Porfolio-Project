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
         {
           name: "Beefy Breath",
           userId: 2,
           imageUrl: "imageUrl",
         },
         {
           name: "Taco Bell",
           userId: 3,
           imageUrl: "imageUrl",
         },
         {
           name: "For when I have gas",
           userId: 4,
           imageUrl: "imageUrl",
         },
         {
           name: "Workout",
           userId: 5,
           imageUrl: "imageUrl",
         },
         {
           name: "For a good cry",
           userId: 6,
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
