var express = require('express')
var DrugFinder = require('./drug_finder')
var app = express()

app.get('/get-candidates', function(req, res) {
  console.log("REQUEST: " + req.body);
  var gene = req.body.gene
  DrugFinder.getCandidates(gene, function(result) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    res.json({candidates: result})
  })
})

app.listen(process.env.PORT || 10000)
