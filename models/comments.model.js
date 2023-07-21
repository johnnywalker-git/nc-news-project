const db = require("../db/connection")

exports.deleteSelectedComment = (comment) => {
    return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING*`, [comment.comment_id])
    .then(({rows}) => {
        if(!rows.length) {
            Promise.reject(err)
        }
        else return rows
    })
}