const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth");

const { Album, User, Song } = require("../db/models");

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

module.exports = router;
