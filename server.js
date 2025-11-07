const express = require('express')
const app = express()
const PORT = process.env.PORT

const connection = require("./database/connection")


app.listen(PORT, ()=>{
    console.log(`Connected to http://localhost:${PORT}`);
    
})

app.get("/", (req, res)=>{
    res.send("home")
})

app.get("/api/movies", (req, res)=>{
    const sql = "SELECT * FROM movies"

    connection.query(sql, (err, result)=>{
        if(err) return res.status(500).json({message: err.message})
        console.log(result);
        
        res.send(result);
    })
})