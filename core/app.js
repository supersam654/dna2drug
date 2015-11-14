var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var logger = require('winston')

app.use(bodyParser.urlencoded({ extended: true }))
app.get('/app', function (req, res, next) {
  var filePath = __dirname + '/public/app.html'
  res.sendFile(filePath)
})

function onStart () {
  logger.info('Server is starting.')
}

app.listen(process.env.PORT || 8000)

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  var filePath = __dirname + '/public/app.html'
  res.sendFile(filePath)
})
