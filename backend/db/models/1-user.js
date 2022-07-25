'use strict';
const bcrypt = require("bcryptjs");

const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // This method will return an object with only the User instance information that is
    // safe to save in a JWT (id, username, email)
    toSafeObject() {
      const { id, firstName, lastName, username, email } = this; // context will be the User instance
      return { id, firstName, lastName, email };
    }
    // This method accepts a password string and will return true if there is a match with the
    // User instance's hashedPassword. If there is no match it will return false
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    // This method accepts an id and should use the currentUser scope to return a User with that id
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    // This method accepts an object with credential and password keys. It should search for one
    // User with the specified credential (either a username or an email). If a user is found,
    // then the method should validate the password by passing it into the instance's .validatePassword
    // method. If the password is valid, then the method should return the user by using the
    // currentUser scope.
    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }
    // This method accepts an object with a username, email, and password key. It will hash the password
    // using the bcryptjs package's hashsync method. It will then create a User with the username, email,
    // and hashedPassword. Lastly, it will return the created user using the currentUser scope.
    static async signup({ firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword,
      });
      return await User.scope("currentUser").findByPk(user.id);
    }

    static associate(models) {
      User.hasMany(models.Album, { foreignKey: "userId" });
      User.hasMany(models.Comment, { foreignKey: "userId" });
      User.hasMany(models.Song, { foreignKey: "userId" });
      User.hasMany(models.Playlist, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            //ensures there are only letters, no numbers
            args: true,
            msg: "Characters must be all letters.",
          },
          len: [1, 60],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            //ensures there are only letters, no numbers
            args: true,
            msg: "Characters must be all letters.",
          },
          len: [1, 60],
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      imageUrl: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: {
            exclude: ["hashedPassword", "createdAt", "updatedAt"],
          },
        },
        loginUser: {
          attributes: {
            include: ["firstName", "lastName", "username", "email"]
          },
        },
      },
    }
  );
  return User;
};
