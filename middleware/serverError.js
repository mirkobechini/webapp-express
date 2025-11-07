function serverError(err, req, res, next){
    res.status(500).json({error: err})
}

module.exports = serverError