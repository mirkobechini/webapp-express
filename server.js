const express = require('express')
const app = express()
const PORT = process.env.PORT

const movieController = require("./controllers/movieController")


app.listen(PORT, () => {
    console.log(`Connected to http://localhost:${PORT}`);

})

app.get("/", (req, res) => {
    res.send("home")
})

app.get("/api/movies", movieController.index)

app.get("/api/movies/:id", movieController.show)