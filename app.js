const express = require('express')
const { getAllTopics } = require('./controllers/topics.controller')
const { getAllEndpoints } = require('./controllers/endPoints.controller')
const { getArticle, getAllArticles, addComment, updateArticleVotes, getArticleComments } = require("./controllers/articles.controller")

const { getAllUsers } = require('./controllers/users.controller')

const app = express()

app.use(express.json())

app.get("/api/topics", getAllTopics)

app.get("/api", getAllEndpoints)

app.get("/api/articles/:article_id", getArticle)

app.get("/api/articles/:article_id/comments", getArticleComments)

app.get("/api/articles", getAllArticles)

app.get("/api/users", getAllUsers)

app.patch("/api/articles/:article_id", updateArticleVotes)

app.use((err, req, res, next) => {
    if(err.code === "22P02")
    {
    res.status(400).send({msg : "Bad request"})
    } else
    res.status(404).send({msg : "Not Found"})
})

module.exports = app