var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var logger = require('winston')

var MutationParser = require('./MutationParser')

app.use(bodyParser.urlencoded({ extended: true }))

function onStart () {
  logger.info('Server is starting.')
}

app.listen(process.env.PORT || 8000)

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  logger.info('in root')
})

app.get('/getMutations:', function (req, res) {
  var sequence = req.body.sequence
  MutationParser.getMutation(sequence, function(result) {
    res.json({mutation: result})
  })
})
