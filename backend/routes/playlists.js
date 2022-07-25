const express = require("express");
const router = express.Router();

const { Song, PlaylistSong, Playlist } = require("../db/models");
const { requireAuth } = require("../utils/auth");
const { playlistValidation } = require("../utils/validation");

// Get details of a Playlist from an id
router.get("/:playlistId", async (req, res) => {
  const { playlistId } = req.params;

  const playlistDetails = await Playlist.findByPk(playlistId, {
    attributes: [
      "id",
      "userId",
      "name",
      "createdAt",
      "updatedAt",
      "previewImage",
    ],
    include: [
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
        through: { attributes: [] },
      },
    ],
  });
  if (!playlistDetails) {
    const error = new Error("Playlist couldn't be found");
    error.status = 404;
    throw error;
  }
  res.json(playlistDetails);
});

// Add a Song to a Playlist based on the Playlists's id
router.post("/:playlistId", requireAuth, async (req, res) => {
  const { playlistId } = req.params;
  const { user } = req;
  const { songId } = req.body;

  const playlist = await Playlist.findByPk(playlistId);
  const song = await Song.findByPk(songId);

  if (playlist) {
    if (song) {
      if (playlist.userId === user.id) {
        const newlyAddedPlaylistSong = await PlaylistSong.create({
          playlistId,
          songId,
        });
        const newPlaylistSong = await PlaylistSong.findOne({
          where: { playlistId, songId },
          attributes: ["id", "playlistId", "songId"],
        });
        res.json(newPlaylistSong);
      } else {
        const error = new Error("Validation Error");
        error.status = 400;
        throw error;
      }
    } else {
      const error = new Error("Song couldn't be found");
      error.status = 404;
      throw error;
    }
  } else {
    const error = new Error("Playlist couldn't be found");
    error.status = 404;
    throw error;
  }
});

// Create a Playlist
router.post("/", requireAuth, playlistValidation, async (req, res) => {
  const { user } = req;
  const { name, previewImage } = req.body;

  const newPlaylist = await Playlist.create({
    userId: user.id,
    name,
    previewImage,
  });
  res.status(201);
  res.json(newPlaylist);
});

// Edit a Playlist
router.put(
  "/:playlistId",
  requireAuth,
  playlistValidation,
  async (req, res) => {
    const { playlistId } = req.params;
    const { user } = req;
    const { name, previewImage } = req.body;
    const editedPlaylist = await Playlist.findByPk(playlistId);

    if (editedPlaylist) {
      if (editedPlaylist.userId === user.id) {
        await editedPlaylist.update({
          name,
          previewImage,
        });
        res.json(editedPlaylist);
      } else {
        const error = new Error("Validation Error");
        error.status = 400;
        throw error;
      }
    } else {
      const error = new Error("Playlist couldn't be found");
      error.status = 404;
      throw error;
    }
  }
);

// Delete a Playlist
router.delete("/:playlistId", requireAuth, async (req, res) => {
  const { playlistId } = req.params;
  const { user } = req;
  const deletedPlaylist = await Playlist.findByPk(playlistId);

  if (deletedPlaylist) {
    if (deletedPlaylist.userId === user.id) {
      await deletedPlaylist.destroy();
      res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      const error = new Error("Validation Error");
      error.status = 400;
      throw error;
    }
  } else {
    const error = new Error("Playlist couldn't be found");
    error.status = 404;
    throw error;
  }
});

module.exports = router;
