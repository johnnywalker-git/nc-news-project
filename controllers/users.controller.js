const { fetchAllUsers } = require("../models/users.model")

exports.getAllUsers = (req, res, next) => {
    fetchAllUsers().then((data) => {
        res.status(200).send(data)
    })
}