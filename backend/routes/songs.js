const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth");

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



module.exports = router;
