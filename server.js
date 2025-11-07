const express = require('express')
const app = express()
const PORT = process.env.PORT

const movieRouter = require("./router/movie")


const notFound = require("./middleware/notFound")
const serverError = require("./middleware/serverError")

app.listen(PORT, () => {
    console.log(`Connected to http://localhost:${PORT}`);

})

app.get("/", (req, res) => {
    res.send("home")
})

app.use("/api/movies", movieRouter)

app.use(notFound)

app.use(serverError)