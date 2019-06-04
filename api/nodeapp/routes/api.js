const express = require('express')
const router = express.Router()
const app = express()


var mysql = require("mysql")
var connection = mysql.createConnection({
  host     : 'mysqlserver',
  user     : 'root',
  password : '123456',
  database : "db_rest",
  port     : "3306"
})



router.post('/get/product/all', (req, res) => {
    connection.connect()
    console.log(req.body)
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err
      console.log('The solution is: ', rows[0].solution)
    })
    console.log("hola")
    connection.end()

})

module.exports = router
