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