const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth");
const { songValidation, commentValidation, pageValidation } = require("../utils/validation");

const { Song, Album, Comment, User, sequelize } = require("../db/models");

const { environment } = require("../config");
const isProduction = environment === "production";

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
            [sequelize.col("imageUrl"), "previewImage"],
          ],
        },
        {
          model: Album,
          attributes: [
            "id",
            "title",
            [sequelize.col("imageUrl"), "previewImage"],
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
router.get("/", pageValidation, async (req, res) => {
  let { page, size, createdAt, title } = req.query;
  if (page) page = parseInt(page);
  if (size) size = parseInt(size);

  let where = {};
  let pag = {};

  if (!page) page = 0;
  if (!size) size = 20;

  if (page > 10) {
    page = 0;
  } else {
    page = page;
  }

  if (size > 20) {
    size = 20;
  } else {
    size = size;
  }

  if (page > 0) {
    pag.limit = size;
    pag.offset = size * (page - 1);
  } else {
    pag.limit = size;
  }

  if (isProduction) {
    if (title) where.title = { [Op.ilike]: `%${title}%` };
    if (createdAt) where.createdAt = createdAt;
  } else {
    if (title) where.title = { [Op.like]: `%${title}%` };
    if (createdAt) where.createdAt = createdAt;
  }

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
      where: { ...where },
      ...pag
    });
    res.json({ allSongs, page, size });
});

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
