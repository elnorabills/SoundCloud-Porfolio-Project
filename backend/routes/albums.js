const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth");

const { Album, User, Song } = require("../db/models");
const { songValidation } = require("../utils/validation");

// Get details of an Album from an id
router.get("/:albumId", async (req, res) => {
    const { albumId } = req.params;

    const albumDetails = await Album.findByPk(albumId, {
      attributes: [
        "id",
        "userId",
        "title",
        "description",
        "createdAt",
        "updatedAt",
        "previewImage",
      ],
      include: [
        {
          model: User,
          as: "Artist",
          attributes: ["id", "username", "previewImage"],
        },
        {
          model: Song,
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
        },
      ],
    });
    if (!albumDetails) {
        const error = new Error("Album couldn't be found");
        error.status = 404;
        throw error;
    }
    res.json(albumDetails);
})

// Get all Albums
router.get("/", async (req, res) => {
    const allAlbums = await Album.findAll({
        attributes: [
            "id",
            "userId",
            "title",
            "description",
            "createdAt",
            "updatedAt",
            "previewImage"
        ]
    })
    res.json({ allAlbums });
})

// Create a Song for an Album based on the Album's id
router.post("/:albumId", requireAuth, songValidation, async (req, res) => {
    const { albumId } = req.params;
    const { user } = req;
    const { title, description, url, previewImage } = req.body;

    const album = await Album.findByPk(albumId);

    if (album) {
        if (album.userId === user.id) {
            const createdSong = await Song.create({
                userId: user.id,
                albumId,
                title,
                description,
                url,
                previewImage
            });
            res.status(201);
            res.json(createdSong);
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
