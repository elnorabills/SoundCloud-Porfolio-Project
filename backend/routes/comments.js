const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth");
const { commentValidation } = require("../utils/validation");
const { Comment } = require("../db/models");

// Edit a comment
router.put("/:commentId", requireAuth, commentValidation, async (req, res) => {
    const { commentId } = req.params;
    const { user } = req;
    const { body } = req.body;
    const editedComment = await Comment.findByPk(commentId);

    if (editedComment) {
      if (editedComment.userId === user.id) {
        await editedComment.update({
          body
        });
        res.json(editedComment);
      } else {
        const error = new Error("Validation Error");
        error.status = 400;
        throw error;
      }
    } else {
      const error = new Error("Comment couldn't be found");
      error.status = 404;
      throw error;
    }
});

// Delete a comment
router.delete("/:commentId", requireAuth, async (req, res) => {
    const { commentId } = req.params;
    const { user } = req;
    const deletedComment = await Comment.findByPk(commentId);

    if (deletedComment) {
      if (deletedComment.userId === user.id) {
        await deletedComment.destroy();
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
      const error = new Error("Comment couldn't be found");
      error.status = 404;
      throw error;
    }
})


module.exports = router;
