const connection = require("../database/connection")

function index(req, res) {
    const sql = "SELECT * FROM movies"

    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message })

        res.send(result);
    })
}


function show(req, res) {
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
}


function store(req, res) {

    

    const { title, director, genre, release_year, abstract } = req.body
    const image = 'http://localhost:3000/uploads/' + req.file.originalname

    
    const sql = "INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?) "

    connection.query(sql, [title, director, genre, release_year, abstract, image], (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(201).json({ message: "Movie added" })
    })

}

function storeReviews(req, res) {

    console.log(req.body);

    const movie_id = Number(req.params.id)
    const { name, text, vote} = req.body

    const sql = "INSERT INTO reviews (movie_id, name, text, vote) VALUES (?, ?, ?, ?) "


    connection.query(sql, [movie_id,name, text, vote], (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(201).json({ message: "Review added" })
    })
}

module.exports = { index, show, store, storeReviews }