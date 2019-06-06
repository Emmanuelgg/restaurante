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

var response = {
    status: 200,
    data: {},
    error: null
}

router.post('/add', (req, res) => {
    if (req.body != undefined) {
        try {
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
                if (err) {
                    response.error = err
                } else {
                    response.data = rows
                    response.status = 200
                }
                res.send(response)
                res.end()
                data = rows
            })
            connection.end()
        } catch (e) {
            response.status = 500
            console.log(e)
            res.send(e)
            res.end()
        }

    }
})

router.post('/get', (req, res) => {
    if (req.body != undefined) {
        try {
            connect()
            let table = req.body.table
            let columns = req.body.columns
            let where = req.body.where != undefined ? req.body.columns : ""
            let query = select(table, columns, where)
            connection.query(query, function(err, rows, fields) {
                if (err) {
                    response.error = err
                    response.status = 500
                } else {
                    response.data = rows
                    response.status = 200
                }
                res.send(response)
                res.end()
            })
            connection.end()
        } catch (e) {
            response.status = 500
            console.log(e)
            res.send(e)
            res.end()
        }
    }
})

var select = (table, columns = "*", where) => {
    let query = `SELECT ${columns} FROM ${table} ${where}`
    return query
}

var insert = (table, columns = "", values) => {
    columns = columns.replace(" ", "")
    columns = columns.split(",")
    values = values.split(",")
    let queryColumns = ""
    for (var i = 0; i < columns.length; i++) {
        if (i != columns.length-1)
            queryColumns += `${columns[i]}, `
        else
            queryColumns += `${columns[i]}`
    }
    let queryValues = ""
    for (var i = 0; i < values.length; i++) {
        if (i != values.length-1)
            queryValues += `"${values[i]}", `
        else
            queryValues += `"${values[i]}"`
    }

    let query = `INSERT INTO ${table} (${queryColumns}) VALUES (${queryValues})`
    if (fields = "")
        query = `INSERT INTO ${table} VALUES (${queryValues})`
    return query
}

var update = (id, table, columns, values) => {
    columns = columns.replace(" ", "")
    columns = columns.split(",")
    values = values.split(",")
    let data = ""
    for (var i = 0; i < columns.length; i++) {
        if (i != columns.length-1)
            data += `${columns[i]} = "${values[i]}", `
        else
            data += `${columns[i]} = "${values[i]}"`
    }
    let query = `UPDATE ${table} SET ${data}  WHERE id_${table} = ${id}`
    return query
}

module.exports = router
