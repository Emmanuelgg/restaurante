const express = require('express')
const router = express.Router()
const app = express()
var mysql = require("mysql")

var connection = null

var connect = () => {
    connection = mysql.createConnection({
      host     : 'mysqlserver',
      user     : 'root',
      password : '123456',
      database : "db_rest",
      port     : "3306"
    })
    connection.connect()
}


router.post('/add', (req, res) => {
    if (req.body != undefined) {
        connect()
        let query = ""
        let table = req.body.table
        let columns = req.body.columns != undefined ? req.body.columns : ""
        let values = req.body.values

        if (req.body.id == 0)
            query = insert(table,columns,values)
        else
            query = update(req.body.id, table, columns, value)

        connection.query(query, function(err, rows, fields) {
          if (err) throw err
          console.log("ok");
        })
        connection.end()
    }
})

router.post('/get', (req, res) => {
    if (req.body != undefined) {
        connect()
        let table = req.body.table
        let columns = req.body.columns
        let where = req.body.where != undefined ? req.body.columns : ""
        let query = select(table, columns, where)
        connection.query(query, function(err, rows, fields) {
          if (err) throw err
          let response = {
              status: 200,
              data: rows
          }
          res.send(response)
          res.end()
        })
        connection.end()
    }

})

var select = (table, columns = "*", where) => {
    let query = `SELECT ${columns} FROM ${table} ${where}`
    return query
}

var insert = (table, columns = "", values) => {
    let query = `INSERT INTO ${table} (${columns}) VALUES (${values})`
    if (fields = "")
        query = `INSERT INTO ${table} VALUES (${columns})`
    return query
}

var update = (id, table, columns, values) => {
    columns = columns.replace(" ", "")
    columns = columns.split(",")
    values = values.split(",")
    let data = ""
    for (var i = 0; i < columns.length; i++) {
        if (i != columns.length-1)
            data += `${columns[i]} = ${values[i]}, `
        else
            data += `${columns[i]} = ${values[i]}`
    }
    let query = `UPDATE ${table} SET ${data}  WHERE id_${table} = ${id}`
    return query
}

module.exports = router
