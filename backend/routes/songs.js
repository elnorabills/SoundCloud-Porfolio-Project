const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth");

const { Song, Album, Comment, User, sequelize } = require("../db/models");

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
            [sequelize.col("Song.imageUrl"), "previewImage"]
        ]
    })
    res.json({ allSongs });
})



module.exports = router;
