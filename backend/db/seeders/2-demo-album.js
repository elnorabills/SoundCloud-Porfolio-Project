"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Albums",
      [
        {
          title: "Demo",
          description: "Demo Album is a demo",
          userId: 1,
          previewImage: "image url",
        },
        {
          title: "Demo2",
          description: "Second demo album",
          userId: 2,
          previewImage: "image url",
        },
        {
          title: "Demo3",
          description: "Third demo album",
          userId: 3,
          previewImage: "image url",
        },
        {
          title: "Beerbongs and Bentlys",
          description: "This album was popular my sophomore year of college",
          userId: 4,
          previewImage: "image url",
        },
        {
          title: "Tim",
          description: "Rest in peace Avicii",
          userId: 5,
          previewImage: "image url",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Albums', null, {});

  },
};
