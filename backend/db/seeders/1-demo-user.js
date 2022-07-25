"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Ashton",
          lastName: "Kutcher",
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl: "previewImg url",
        },
        {
          firstName: "Bradly",
          lastName: "Cooper",
          email: "user1@user.io",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
          imageUrl: "previewImg url",
        },
        {
          firstName: "Christian",
          lastName: "Bale",
          email: "user2@user.io",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password3"),
          imageUrl: "previewImg url",
        },
        {
          firstName: "Dwayne",
          lastName: "Johnson",
          email: "therock@user.io",
          username: "RockMan3",
          hashedPassword: bcrypt.hashSync("password4"),
          imageUrl: "previewImg url",
        },
        {
          firstName: "Ewan",
          lastName: "McGregor",
          email: "obi-wan@user.io",
          username: "Obi-Wan",
          hashedPassword: bcrypt.hashSync("password5"),
          imageUrl: "previewImg url",
        },
        {
          firstName: "Frank",
          lastName: "Sinatra",
          email: "singer@user.io",
          username: "NewYorkNewYork",
          hashedPassword: bcrypt.hashSync("password6"),
          imageUrl: "previewImg url",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", {
      username: {
        [Op.in]: [
          "Demo-lition",
          "FakeUser1",
          "FakeUser2",
          "RockMan3",
          "Obi-Wan",
          "NewYorkNewYork",
        ],
      },
    });
  },
};
