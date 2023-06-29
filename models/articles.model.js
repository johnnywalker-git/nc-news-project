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
       return{"comments" : rows}
    })
}