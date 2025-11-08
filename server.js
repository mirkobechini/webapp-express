const express = require('express')
const app = express()
const PORT = process.env.PORT
const cors = require("cors")

//Routes
const movieRouter = require("./router/movie")

//Middleware
const notFound = require("./middleware/notFound")
const serverError = require("./middleware/serverError")

app.use(express.static('public'));

app.use(cors())

//{origin: "http:/localhost:5173/"}


app.listen(PORT, () => {
    console.log(`Connected to http://localhost:${PORT}`);

})

app.get("/", (req, res) => {
    res.send("home")
})


app.use("/api/movies", movieRouter)

app.use(notFound)

app.use(serverError)