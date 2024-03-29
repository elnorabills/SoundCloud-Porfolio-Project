'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert(
       "Songs",
       [
         {
           title: "Massive",
           description: "Drake does house music",
           userId: 1,
           albumId: 1,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
         {
           title: "Tidal Wave",
           description: "Very chill vibes",
           userId: 2,
           albumId: 2,
           url: "jiwijwo",
           imageUrl: "image url",
         },
         {
           title: "Heaven",
           description: "Beautiful song",
           userId: 3,
           albumId: 3,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
         {
           title: "Boy",
           description: "Very melodic",
           userId: 4,
           albumId: 4,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
         {
           title: "Make Me Go",
           description: "Kinda weird not gonna lie",
           userId: 4,
           albumId: 4,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
         {
           title: "Better",
           description: "Not sure if I like it or not",
           userId: 5,
           albumId: 5,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
         {
           title: "Somebody",
           description: "Very fun but very basic",
           userId: 5,
           albumId: 5,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
         {
           title: "Don't Leave",
           description: "This is a good one",
           userId: 5,
           albumId: 5,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
         {
           title: "Red Light",
           description: "Talks to Kindergarteners",
           userId: 4,
           albumId: 4,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
         {
           title: "Hunter",
           description: "Not about hunting at all",
           userId: 4,
           albumId: 4,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
         {
           title: "Mistakes",
           description: "Very sad song",
           userId: 4,
           albumId: 4,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
         {
           title: "My Youth",
           description: "Not a good song at all",
           userId: 4,
           albumId: 4,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
         {
           title: "Grapevine",
           description: "Sounds like MGK but isn't",
           userId: 5,
           albumId: 6,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
         {
           title: "Drunk",
           description: "Song about getting drunk",
           userId: 5,
           albumId: 6,
           url: "owiejfowijefo",
           imageUrl: "image url",
         },
       ],
       {}
     );

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Songs', null, {});

  }
};
