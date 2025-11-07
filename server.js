const express = require('express')
const app = express()
const PORT = process.env.PORT

const connection = require("./database/connection")


app.listen(PORT, () => {
    console.log(`Connected to http://localhost:${PORT}`);

})

app.get("/", (req, res) => {
    res.send("home")
})

app.get("/api/movies", (req, res) => {
    const sql = "SELECT * FROM movies"

    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message })

        res.send(result);
    })
})

app.get("/api/movies/:id", (req, res) => {
    const sql = "SELECT * FROM movies where id = ?"
    const reviewsSql = "SELECT * FROM reviews where movie_id = ?"
    const movie_id = Number(req.params.id)

    connection.query(sql, [movie_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        if (result.length === 0) return res.status(404).json({ message: "Movie not found" })

        connection.query(reviewsSql, [movie_id], (reviewsErr, reviewsResult) => {
            if (err) return res.status(500).json({ error: reviewsErr.message })
            const movieObj = ({ ...result[0], reviews: reviewsResult })
            res.send(movieObj)
        })

    })
})