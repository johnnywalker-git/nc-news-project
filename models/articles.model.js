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

exports.fetchArticles = () => {
    return db.query
    (` ALTER TABLE articles ADD COLUMN comments_count INT DEFAULT 0 NOT NULL;`)
    .then(() => {
        return db.query
   (`UPDATE articles SET comments_count = (SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id);`)
    })
    .then(() => {
        return db.query
   (`SELECT author,title,article_id,topic,created_at,votes,article_img_url,comments_count FROM articles ORDER BY created_at DESC;`)
    })
    .then(({rows}) => {
    return{"allArticles": rows}
   })
}