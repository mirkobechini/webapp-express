const express = require('express')
const app = express()
const PORT = process.env.PORT


app.listen(PORT, ()=>{
    console.log(`Connected to http://localhost:${PORT}`);
    
})

app.get("/", (req, res)=>{
    res.send("home")
})