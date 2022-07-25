const express = require("express");
const router = express.Router();

const { User, Song, Album, Playlist } = require("../db/models");

// Get all Albums of an Artist from an id
router.get("/:artistId/albums", async (req, res) => {
  const { artistId } = req.params;
  const artist = await User.findByPk(artistId);

  if (artist) {
    const artistAlbums = await Album.findAll({
      where: { userId: artistId },
      attributes: [
        "id",
        "userId",
        "title",
        "description",
        "createdAt",
        "updatedAt",
        "previewImage",
      ],
    });
    res.json({ artistAlbums });
  } else {
    const error = new Error("Artist couldn't be found");
    error.status = 404;
    throw error;
  }
});

// Get all Playlists of an Artist from an id
router.get("/:artistId/playlists", async (req, res) => {
  const { artistId } = req.params;
  const artist = await User.findByPk(artistId);

  if (artist) {
    const artistPlaylists = await Playlist.findAll({
      where: { userId: artistId },
      attributes: [
        "id",
        "userId",
        "name",
        "createdAt",
        "updatedAt",
        "previewImage",
      ],
    });
    res.json({ artistPlaylists });
  } else {
    const error = new Error("Artist couldn't be found");
    error.status = 404;
    throw error;
  }
});

// Get all Songs of an Artist from an id
router.get("/:artistId/songs", async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findByPk(artistId);

    if (artist) {
        const artistSongs = await Song.findAll({
          where: { userId: artistId },
          attributes: [
            "id",
            "userId",
            "albumId",
            "title",
            "description",
            "url",
            "createdAt",
            "updatedAt",
            "previewImage",
          ],
        });
        res.json({ artistSongs });
    } else {
        const error = new Error("Artist couldn't be found");
        error.status = 404;
        throw error;
    }
})

// Get details of an Artist from an id
router.get("/:artistId", async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findByPk(artistId, {
        attributes: [
            "id",
            "username",
            "previewImage"
        ]
    });
    const totalSongs = await Song.count({ where: { userId: artistId }});
    const totalAlbums = await Album.count({ where: { userId: artistId }});

    if (artist) {
        res.json({
            ...artist.dataValues,
            totalSongs,
            totalAlbums
            // previewImage for each song??
        })
    } else {
        const error = new Error("Artist couldn't be found");
        error.status = 404;
        throw error;
    }
})

module.exports = router;
