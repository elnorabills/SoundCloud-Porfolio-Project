const { validationResult } = require("express-validator");
const { check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

// songs.js and albums.js
const songValidation = [
  check("title").exists({ checkFalsy: true }).withMessage("Song title is required"),
  check("url").exists({ checkFalsy: true }).withMessage("Audio is required"),
  handleValidationErrors
];

// albums.js
const albumValidation = [
  check("title").exists({ checkFalsy: true }).withMessage("Album title is required"),
  handleValidationErrors,
];

// songs.js and comments.js
const commentValidation = [
  check("body").exists({ checkFalsy: true }).withMessage("Comment body text is required"),
  handleValidationErrors,
];

// playlists.js
const playlistValidation = [
  check("name").exists({ checkFalsy: true }).withMessage("Playlist name is required"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  songValidation,
  albumValidation,
  commentValidation,
  playlistValidation,
};
