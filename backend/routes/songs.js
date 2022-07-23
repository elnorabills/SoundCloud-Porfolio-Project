const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth");
const { songValidation } = require("../utils/validation");

const { Song, Album, Comment, User } = require("../db/models");

// Get details of song by songId
router.get("/:songId", async (req, res) => {
    const { songId } = req.params;
    const songDetails = await Song.findByPk(songId, {
      attributes: [
        "id",
        "userId",
        "albumId",
        "title",
        "description",
        "url",
        "createdAt",
        "updatedAt",
        "previewImage"
      ],
      include: [
        {
          model: User,
          as: "Artist",
          attributes: [
            "id",
            "username",
            "previewImage"
          ],
        },
        {
          model: Album,
          attributes: [
            "id",
            "title",
            "previewImage"
          ],
        },
      ],
    });
    if (!songDetails) {
        const error = new Error("Song couldn't be found");
        error.status = 404;
        throw error;
    }
    res.json( songDetails )
})

// Get All Songs
router.get("/", async (req, res) => {
    const allSongs = await Song.findAll({
        attributes: [
            "id",
            "userId",
            "albumId",
            "title",
            "description",
            "url",
            "createdAt",
            "updatedAt",
            "previewImage"
        ]
    })
    res.json({ allSongs });
})

// Edit a song
router.put("/:songId", requireAuth, songValidation, async (req, res) => {
  const { songId } = req.params;
  const { user } = req;
  const { title, description, url, previewImage } = req.body;

  const editedSong = await Song.findByPk(songId);

  if (editedSong) {
    if (editedSong.userId === user.id) {
      await editedSong.update({
        title,
        description,
        url,
        previewImage,
      });
      res.json(editedSong);
    } else {
      const error = new Error("Validation Error");
      error.status = 400;
      throw error;
    }
  } else {
    const error = new Error("Album couldn't be found");
    error.status = 404;
    throw error;
  }
})

module.exports = router;
