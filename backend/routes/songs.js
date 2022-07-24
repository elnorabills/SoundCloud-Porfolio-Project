const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth");
const { songValidation, commentValidation } = require("../utils/validation");

const { Song, Album, Comment, User } = require("../db/models");

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
        statusCode: 200
      })
    }
  } else {
    const error = new Error("Song couldn't be found");
    error.status = 404;
    throw error;
  }
})

module.exports = router;
