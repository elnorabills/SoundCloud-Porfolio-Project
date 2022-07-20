'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

  await queryInterface.bulkInsert(
    "Comments",
    [
      {
        userId: 2,
        songId: 1,
        body: "I like this song a lot",
      },
      {
        userId: 1,
        songId: 3,
        body: "This song makes no sense",
      },
      {
        userId: 3,
        songId: 8,
        body: "This melody is so pretty",
      },
      {
        userId: 1,
        songId: 4,
        body: "Not really what I expected",
      },
      {
        userId: 5,
        songId: 6,
        body: "I love this song so much!",
      },
      {
        userId: 6,
        songId: 8,
        body: "I have been obsessed with this one",
      },
      {
        userId: 1,
        songId: 7,
        body: "Too slow paced",
      },
      {
        userId: 6,
        songId: 2,
        body: "We need more songs like this",
      },
      {
        userId: 2,
        songId: 8,
        body: "This one isn't for me",
      },
    ],
    {}
  );

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Comments', null, {});

  }
};
