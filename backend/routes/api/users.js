const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/sign-up", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  const validateEmail = await User.findOne({ where: { email }});
  const validateUsername = await User.findOne({ where: { username }});

  if (validateEmail) {
    const error = new Error("User already exists");
    error.status = 403;
    error.errors = ["User with that email already exists"];
    throw error;
  }

  if (validateUsername) {
    const error = new Error("User already Exists");
    error.status = 403;
    error.errors = ["User with that username already exists"];
    throw error;
  }

  const user = await User.signup({ firstName, lastName, email, username, password });

  const token = await setTokenCookie(res, user);

  return res.json({
    ...user.toSafeObject(),
    token
  });
});

module.exports = router;
