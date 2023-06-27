const { readArticle } = require("../models/articles.model")

exports.getArticle = (req, res, next) => {

   readArticle(req.params)
   .then((article) => {
   res.status(200).send(article.finishedArticle)
   }).catch(next)
}