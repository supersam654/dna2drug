var express = require('express')
var DrugOptimizer = require('./drug_optimizer')
var app = express()
var cors = require('cors')

app.use(cors())

app.get('/get-solution', function(req, res) {
  DrugOptimizer.findTreatment(function(result) {
    res.json({candidates: result})
  })
})

app.get('/add-candidates', function(req, res) {
  var candidates = req.query.candidates
  DrugOptimizer.addCandidates(candidates, function() {
    res.send('finish')
  })
})

app.listen(process.env.PORT || 12000)
