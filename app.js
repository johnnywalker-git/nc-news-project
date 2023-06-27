const express = require('express')
const { getAllTopics } = require('./controllers/topics.controller')
const { getAllEndpoints } = require('./controllers/endPoints.controller')
const app = express()



app.get("/api/topics", getAllTopics)

app.get("/api", getAllEndpoints)

module.exports = app