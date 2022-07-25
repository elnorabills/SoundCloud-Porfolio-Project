const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth");
const { songValidation, commentValidation } = require("../utils/validation");

const { Song, Album, Comment, User, sequelize } = require("../db/models");

// Get all Comments by a Song's id
router.get("/:songId/comments", async (req, res) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId, {
    include: [
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: [
              "id",
              "username"
            ]
          }
        ]
      }
    ]
  })
  if (song) {
    res.json({ Comments: song.Comments });
  } else {
    const error = new Error("Song couldn't be found");
    error.status = 404;
    throw error;
  }
})

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
        [sequelize.col("Song.imageUrl"), "previewImage"],
      ],
      include: [
        {
          model: User,
          as: "Artist",
          attributes: [
            "id",
            "username",
            [sequelize.col("Song.imageUrl"), "previewImage"],
          ],
        },
        {
          model: Album,
          attributes: [
            "id",
            "title",
            [sequelize.col("Song.imageUrl"), "previewImage"],
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
        [sequelize.col("Song.imageUrl"), "previewImage"],
      ],
    });
    res.json({ allSongs });
})

// Create a Comment for a Song based on the Song's id
router.post("/:songId/comments", requireAuth, commentValidation, async (req, res) => {
  const { songId } = req.params;
  const { user } = req;
  const { body } = req.body;
  const song = await Song.findByPk(songId);

  if (song) {
    const newComment = await Comment.create({
      userId: user.id,
      songId,
      body
    });
    res.json(newComment);
  } else {
    const error = new Error("Song couldn't be found");
    error.status = 404;
    throw error;
  }
})

// Edit a song
router.put("/:songId", requireAuth, songValidation, async (req, res) => {
  const { songId } = req.params;
  const { user } = req;
  const { title, description, url, imageUrl } = req.body;

  const editedSong = await Song.findByPk(songId);

  if (editedSong) {
    if (editedSong.userId === user.id) {
      await editedSong.update({
        title,
        description,
        url,
        imageUrl,
      });
      editedSong.dataValues.previewImage = imageUrl;
      delete editedSong.dataValues.imageUrl;

      res.json(editedSong);
    } else {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }
  } else {
    const error = new Error("Song couldn't be found");
    error.status = 404;
    throw error;
  }
})

// Delete a Song
router.delete("/:songId", requireAuth, async (req, res) => {
  const { songId } = req.params;
  const { user } = req;

  const deletedSong = await Song.findByPk(songId);

  if (deletedSong) {
    if (deletedSong.userId === user.id) {
      await deletedSong.destroy();
      res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }
  } else {
    const error = new Error("Song couldn't be found");
    error.status = 404;
    throw error;
  }
})

module.exports = router;
