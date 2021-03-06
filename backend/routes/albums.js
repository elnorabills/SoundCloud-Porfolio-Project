const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth");

const { Album, User, Song, sequelize } = require("../db/models");
const { songValidation, albumValidation } = require("../utils/validation");

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
        [sequelize.col("Album.imageUrl"), "previewImage"],
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
            [sequelize.col("imageUrl"), "previewImage"],
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
        [sequelize.col("imageUrl"), "previewImage"],
      ],
    });
    res.json({ allAlbums });
})

// Create a Song for an Album based on the Album's id
router.post("/:albumId", requireAuth, songValidation, async (req, res) => {
    const { albumId } = req.params;
    const { user } = req;
    const { title, description, url, imageUrl } = req.body;

    const album = await Album.findByPk(albumId);

    if (album) {
        if (album.userId === user.id) {
            const createdSong = await Song.create({
                userId: user.id,
                albumId,
                title,
                description,
                url,
                imageUrl
            });
            createdSong.dataValues.previewImage = createdSong.dataValues.imageUrl;
            delete createdSong.dataValues.imageUrl;

            res.status(201);
            res.json(createdSong);
        } else {
            const error = new Error("Forbidden");
            error.status = 403;
            throw error;
        }
    } else {
        const error = new Error("Album couldn't be found");
        error.status = 404;
        throw error;
    }
})

// Create an Album
router.post("/", requireAuth, albumValidation, async (req, res) => {
    const { user } = req;
    const { title, description, imageUrl } = req.body;

    const newAlbum = await Album.create({
        userId: user.id,
        title,
        description,
        imageUrl
    })
    newAlbum.dataValues.previewImage = newAlbum.dataValues.imageUrl;
    delete newAlbum.dataValues.imageUrl;

    res.status(201);
    res.json(newAlbum);
})

// Edit an Album
router.put("/:albumId", requireAuth, albumValidation, async (req, res) => {
    const { albumId } = req.params;
    const { user } = req;
    const { title, description, imageUrl } = req.body;

    const editedAlbum = await Album.findByPk(albumId);

    if (editedAlbum) {
      if (editedAlbum.userId === user.id) {
        await editedAlbum.update({
          title,
          description,
          imageUrl,
        });
        editedAlbum.dataValues.previewImage = editedAlbum.dataValues.imageUrl;
        delete editedAlbum.dataValues.imageUrl;

        res.json(editedAlbum);
      } else {
        const error = new Error("Forbidden");
        error.status = 403;
        throw error;
      }
    } else {
      const error = new Error("Album couldn't be found");
      error.status = 404;
      throw error;
    }
})

// Delete an Album
router.delete("/:albumId", requireAuth, async (req, res) => {
    const { albumId } = req.params;
    const { user } = req;

    const deletedAlbum = await Album.findByPk(albumId);

     if (deletedAlbum) {
       if (deletedAlbum.userId === user.id) {
         await deletedAlbum.destroy();
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
       const error = new Error("Album couldn't be found");
       error.status = 404;
       throw error;
     }
})

module.exports = router;
