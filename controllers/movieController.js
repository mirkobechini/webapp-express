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


function store(req, res){
    
    console.log(req.body);

    const sql = "INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?) "
    

}

function storeReviews(req, res){
    
    console.log(req.body);
    

    const sql = "INSERT INTO reviews (movie_id, name, text, vote) VALUES (?, ?, ?, ?) "

    const movie_id = Number(req.params.id)

    res.json(req.body)
}

module.exports = {index, show, store, storeReviews}