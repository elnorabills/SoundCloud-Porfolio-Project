'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert(
       "PlaylistSongs",
       [
         {
           playlistId: 2,
           songId: 3,
         },
         {
           playlistId: 2,
           songId: 2,
         },
         {
           playlistId: 2,
           songId: 1,
         },
         {
           playlistId: 1,
           songId: 8,
         },
         {
           playlistId: 1,
           songId: 7,
         },
         {
           playlistId: 1,
           songId: 6,
         },
         {
           playlistId: 1,
           songId: 5,
         },
         {
           playlistId: 1,
           songId: 4,
         },
       ],
       {}
     );

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('PlaylistSongs', null, {});

  }
};
