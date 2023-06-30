const { readArticle, fetchArticles, updateVotes } = require("../models/articles.model")

exports.getArticle = (req, res, next) => {
   readArticle(req.params)
   .then((article) => {
   res.status(200).send(article)
   }).catch(next)
}

exports.getAllArticles = (req, res, next) => {
   fetchArticles().then((data) => {
      res.status(200).send(data.allArticles)
   })
}

exports.updateArticleVotes = (req, res, next) => {
   const articleNo = req.params
   const VoteAmount = req.body
   updateVotes(articleNo, VoteAmount)
   .then((article) => {
      res.status(200).send(article)
   }).catch(next)
}




exports.addComment = (res, req, next) => {
   
}
