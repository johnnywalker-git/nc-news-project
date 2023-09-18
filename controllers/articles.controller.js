const { readArticle, fetchArticles, updateVotes, findComment, addUserComment } = require("../models/articles.model")


exports.getArticle = (req, res, next) => {
   readArticle(req.params)
   .then((article) => {
   res.status(200).send(article)
   }).catch(next)
}

exports.getArticleComments = (req, res, next) => {
   const articleId = req.params.article_id
   findComment(articleId).then((data) => {
      res.status(200).send(data.comments)
   }).catch(next)
}
exports.getAllArticles = (req, res, next) => {
   fetchArticles(req.query).then((data) => {
      res.status(200).send(data.allArticles)
   })
}

exports.updateArticleVotes = (req, res, next) => {
   const articleNo = req.params
   const VoteAmount = req.body
   updateVotes(articleNo, VoteAmount)
   .then((article) => {
      res.status(200).send({article})
   }).catch(next)
}

exports.addComment = (req, res, next) => {
   const { username, body } = req.body
   const { article_id } = req.params
   addUserComment(username,body,article_id)
   .then((body) => {
      res.status(200).send(body)
   }).catch(next)
}
