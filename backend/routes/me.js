const express = require('express');
const router = express.Router();

const { requireAuth, restoreUser } = require("../utils/auth");
const { Album, Song, Playlist, sequelize } = require('../db/models');

// Get Current User
router.get("/", restoreUser, async (req, res) => {
    const { user } = req;

    if (user) {
        return res.json({
            ...user.toSafeObject()
        })
    } else {
        return res.json({})
    }
})

module.exports = router
