const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require("../utils/auth");
const { Album, Song, Playlist, sequelize } = require('../db/models');

// Get all Albums created by the Current User
router.get("/albums", requireAuth, async (req, res) => {
    const { user } = req;
    const allAlbums = await Album.findAll({
      where: { userId: user.id },
      attributes: [
        "id",
        "userId",
        "title",
        "description",
        "createdAt",
        "updatedAt",
        [sequelize.col("imageUrl"), "previewImage"],
      ],
    });
    res.json({ allAlbums });
})

// Get all Playlists created by the Current User
router.get("/playlists", requireAuth, async (req, res) => {
  const { user } = req;
  const allPlaylists = await Playlist.findAll({
    where: { userId: user.id },
    attributes: [
      "id",
      "userId",
      "name",
      "createdAt",
      "updatedAt",
      [sequelize.col("imageUrl"), "previewImage"],
    ],
  });
  res.json({ allPlaylists });
});

// Get all songs created by Current User
router.get("/songs", requireAuth, async (req, res) => {
    const { user } = req;
    const allCreatedSongs = await Song.findAll({
      where: { userId: user.id },
      attributes: [
        "id",
        "userId",
        "albumId",
        "title",
        "description",
        "url",
        "createdAt",
        "updatedAt",
        [sequelize.col("imageUrl"), "previewImage"],
      ],
    });
    res.json({ allCreatedSongs });
})

// Get Current User
router.get("/", restoreUser, async (req, res) => {
    const { user } = req;

    const token = await setTokenCookie(res, user);

    if (user) {
        return res.json({
            ...user.toSafeObject(),
            token
        })
    } else {
        return res.json({})
    }
})

module.exports = router
