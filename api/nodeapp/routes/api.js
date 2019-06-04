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



router.post('/get/product/add', (req, res) => {
    connection.connect()
    console.log(req.body)
    let query = insert(
        "product",
        "id_package_type, id_unit, code, name, quantity_package, price, image_url",
        "1,2,3,4,5,6,7"
    )
    connection.query(query, function(err, rows, fields) {
      if (err) throw err
      console.log("ok");
    })
    connection.end()

})

var insert = (table, fields = "", values) => {
    let query = `INSERT INTO ${table} (${fields}) VALUES (${values})`
    if (fields = "")
        query = `INSERT INTO ${table} VALUES (${values})`
    return query
}

module.exports = router
