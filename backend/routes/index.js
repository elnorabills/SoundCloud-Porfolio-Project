const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

const meRouter = require("./me");
const albumRouter = require("./albums");
const artistRouter = require("./artists");
const commentRouter = require("./comments");
const songRouter = require("./songs");
const playlistRouter = require("./playlists");

router.use("/api", apiRouter);
router.use("/albums", albumRouter);
router.use("artists", artistRouter);
router.use("/comments", commentRouter);
router.use("/me", meRouter);
router.use("/playlists", playlistRouter);
router.use("/songs", songRouter);


// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
