const Router = require("express").Router()

const movieController = require("../controllers/movieController")
const upload = require("../middleware/fileUpload")

Router.get("/", movieController.index)

Router.get("/:id", movieController.show)

Router.post("/", upload.single("image"), movieController.store)

Router.delete("/:id", movieController.destroy)

Router.post("/:id/reviews", movieController.storeReviews)

module.exports = Router