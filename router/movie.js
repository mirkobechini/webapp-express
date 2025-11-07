const Router = require("express").Router()

const movieController = require("../controllers/movieController")

Router.get("/", movieController.index)

Router.get("/:id", movieController.show)

module.exports = Router