const db = require("../db/connection")



exports.readArticle = (article) => {
    return db.query
    (`SELECT * FROM articles WHERE article_id = $1`, [article.article_id])
    .then(({rows}) => {
        const currentArticle = rows[0]
        if(!currentArticle){
            return Promise.reject(err)
        }
        else
        return{"finishedArticle" : currentArticle}
    })
}

exports.findComment = (article) => {   
    return db.query
    (`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at ASC;`, [article])
    .then(({rows}) => {
        const articleComms = rows[0]
        if(!articleComms) {
            return Promise.reject(err)
        }
        else
       return{"comments" : rows}
    })}

exports.fetchArticles = () => {
        return db.query
   (`SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id  = articles.article_id GROUP BY articles.article_id  ORDER BY created_at DESC`)
    .then(({rows}) => {
        rows.forEach((row) => {
            delete(row.body)
        })
        return{"allArticles": rows}
   })
}

exports.updateVotes = (article, voteIncrement) => {
       return db.query(`UPDATE articles SET votes = VOTES + $2 WHERE article_id = $1 RETURNING *`,[article.article_id, voteIncrement.inc_votes])
       .then(({rows}) => {
        const currentArticle = rows[0]
        if(!currentArticle){
            return Promise.reject(err)
        }
        else
        return({"newArticle" : rows})
       })
}
exports.addUserComment = (username,body,article_id) => {
      return db.query(`
      INSERT INTO comments
      (body,author,article_id)
      VALUES
      ($1, $2, $3) RETURNING *;`, [body,username,article_id])
      .then(({rows}) => {
        if(!body || !username) {
            Promise.reject({status: 404, msg :"Bad request"})
        }
        return{"comment" : rows}
      })
}