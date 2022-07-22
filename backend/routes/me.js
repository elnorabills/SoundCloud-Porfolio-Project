const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require("../utils/auth");
const { Album, Song, Playlist, sequelize } = require('../db/models');

// Get Current User
router.get("/", restoreUser, async (req, res) => {
    const { user } = req;

    const token = await setTokenCookie(res, user);

    if (user) {
        return res.json({
            ...user.toSafeObject(),
            token
        })
    } else {
        return res.json({})
    }
})

module.exports = router
