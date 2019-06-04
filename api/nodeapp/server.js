var express = require('express')
const bodyParser = require('body-parser')
var app = express()
var path = require('path')

const api = require('./routes/api')

var environmentRoot =  require('path').normalize(__dirname );

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3010')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(environmentRoot + '/public'));

app.use('/api', api)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})


app.listen(3000, function () {
  console.log('localhost:3000')
})
