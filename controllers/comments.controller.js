const { deleteSelectedComment } = require("../models/comments.model")

exports.deleteComment = (req, res, next) => {
    const comment = req.params
    deleteSelectedComment(comment).then((data) => {
        res.status(204).send()
    }).catch(next)
}