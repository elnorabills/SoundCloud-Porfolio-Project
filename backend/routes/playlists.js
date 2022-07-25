const express = require("express");
const router = express.Router();

const { Song, PlaylistSong, Playlist } = require("../db/models");
const { requireAuth } = require("../utils/auth");
const { playlistValidation } = require("../utils/validation");

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
})

// Create a Playlist
router.post("/", requireAuth, playlistValidation, async (req, res) => {
    const { user } = req;
    const { name, previewImage } = req.body;

    const newPlaylist = await Playlist.create({
        userId: user.id,
        name,
        previewImage
    });
    res.status(201);
    res.json(newPlaylist);
})


module.exports = router;
