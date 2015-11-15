var express = require('express')
var DrugFinder = require('./drug_finder')
var app = express()
var cors = require('cors')

app.use(cors())

app.get('/get-candidates', function(req, res) {
  var gene = req.query.gene
  DrugFinder.getCandidates(gene, function(result) {
    res.json({candidates: result})
  })
})

app.listen(process.env.PORT || 10000)
