const express = require('express')
const { getAllTopics } = require('./controllers/topics.controller')
const { getArticle } = require('./controllers/articles.controller')
const app = express()


app.get("/api/topics", getAllTopics)

app.get("/api/articles/:article_id", getArticle)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(404).send({msg : "Not Found"})
})

module.exports = app