const db = require("../db/connection")



exports.readArticle = (article) => {
    return db.query
    (`SELECT * FROM articles WHERE article_id = $1`, [article.article_id])
    .then(({rows}) => {
        let currentArticle = rows[0]
        if(!currentArticle){

        }
        else
        return{"finishedArticle" : currentArticle}
    })
}