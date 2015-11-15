var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var logger = require('winston')
var MutationParser = require('./MutationParser')
var cors = require('cors')

app.use(cors())

app.get('/', function (req, res) {
  logger.info('in root')
})

app.get('/getMutations', function (req, res) {
  var gene = req.query.gene
  MutationParser.matchMutation(gene, function(result) {
    console.log('result is: ' + result)
    res.json({mutation: result})
  })
})

app.listen(process.env.PORT || 9000)
