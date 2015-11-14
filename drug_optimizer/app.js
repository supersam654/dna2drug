var express = require('express')
var DrugOptimizer = require('./drug_optimizer')

var app = express()
app.get('/get-solution', function(req, res) {
  var gene = req.body.gene
  DrugOptimizer.findTreatment(function(result) {
    res.json({candidates: result})
  })
})

app.listen(process.env.PORT || 12000)
