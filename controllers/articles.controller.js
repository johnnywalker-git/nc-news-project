const { readArticle, findComment } = require("../models/articles.model")

exports.getArticle = (req, res, next) => {
   readArticle(req.params)
   .then((article) => {
   res.status(200).send(article)
   }).catch(next)
}

exports.getArticleComments = (req, res, next,) => {
   const articleId = req.params.article_id
   findComment(articleId).then((data) => {
      res.status(200).send(data.comments)
   })
}