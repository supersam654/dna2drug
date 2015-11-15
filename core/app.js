var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var logger = require('winston')
var Trials = require('./trials')

app.use(bodyParser.urlencoded({ extended: true }))
app.get('/app', function (req, res, next) {
  var filePath = __dirname + '/public/app.html'
  res.sendFile(filePath)
})

function onStart () {
  logger.info('Server is starting.')
}

app.listen(process.env.PORT || 8000, onStart)

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  var filePath = __dirname + '/public/app.html'
  res.sendFile(filePath)
})

app.get('/getTrials', function (req, res) {
  var mutation = req.query.mutation
  Trials.getTrials(mutation, function(result) {
    res.json({trials: result})
  })
})
