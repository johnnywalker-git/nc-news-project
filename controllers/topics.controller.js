
const topics = require("../db/data/test-data/topics")
const topicsTestData  = require ("../db/data/test-data/topics")
const { readAllTopics } = require("../models/topics.model")

exports.getAllTopics = (req,res) => {
    readAllTopics().then((topics) => {
        res.status(200).send(topics.topics)
    })
}