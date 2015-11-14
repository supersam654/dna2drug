var express = require('express')
var DrugFinder = require('./drug_finder')

app.get('/get-candidates', function(req, res) {
  var gene = req.body.gene
  DrugFinder.getCandidates(gene, function(result) {
    res.json({candidates: result})
  })
})
