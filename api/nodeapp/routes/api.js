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
      port     : "3306",
      multipleStatements: true
    })
    connection.connect()
}

router.post('/add', (req, res) => {
    let response = {
        status: 200,
        data: {},
        error: null
    }
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
                query = update(req.body.id, table, columns, values)

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
    let response = {
        status: 200,
        data: {},
        error: null
    }
    if (req.body != undefined) {
        try {
            connect()
            let table = req.body.table
            let columns = req.body.columns
            let where = req.body.where != undefined ? req.body.where : ""
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

router.post('/get/foodOrder', (req, res) => {
    if (req.body != undefined) {
        try {
            connect()
            let id = req.body.id
            let query = select("food_order", "*", `id_dining_table = ${id} AND status = 1`)
            connection.query(query, function(err, rows, fields) {
                if (err) {
                    response.error = err
                    response.status = 500
                } else {
                    if (rows.length <= 0) {
                        query = insert(
                            "food_order",
                            "id_dining_table, id_food_order_type, total, status, created_at, updated_at",
                            `${id}, 1, 0.00, 1, ${getDateTime()}, ${getDateTime()}`
                        )
                        connection.query(query, function(err, rows, fields) {
                            if (err) {
                                response.error = err
                                response.status = 500
                            } else {
                                getDiningTableAndFoodOrder(req, res, id)
                            }
                        })

                    } else {
                        getDiningTableAndFoodOrder(req, res, id)
                    }
                }
            })
            //connection.end()
        } catch (e) {
            response.status = 500
            console.log(e)
            res.send(e)
            res.end()
        }
    }
})

var getDiningTableAndFoodOrder = (req, res, id) => {
    let response = {
        status: 200,
        data: {},
        error: null
    }
    query = `
    SELECT fo.id_food_order, fo.id_dining_table, fo.total, fo.created_at, dt.number, dt.name FROM food_order fo
    LEFT JOIN dining_table dt ON dt.id_dining_table = fo.id_dining_table
    WHERE dt.id_dining_table = ${id} AND fo.status = 1
    `
    connection.query(query, function(err, rows, fields) {
        if (err) {
            response.error = err
            response.status = 500
        }  else {
            response.data.food_order = rows
            query = `
                SELECT fod.*, p.name FROM food_order_description fod
                INNER JOIN product p ON fod.id_product = p.id_product
                WHERE fod.id_food_order = ${rows[0].id_food_order}
            `
            connect()
            connection.query(query, function(err, rows, fields) {
                if (err) {
                    response.error = err
                    response.status = 500
                }  else {
                    response.data.food_order_description = rows
                    response.status = 200
                }
                res.send(response)
                res.end()
            })
            connection.end()
        }
    })
    connection.end()
}

router.post('/logical/delete', (req, res) => {
    let response = {
        status: 200,
        data: {},
        error: null
    }
    if (req.body != undefined) {
        try {
            connect()
            let table = req.body.table
            let id = req.body.id
            let query = logicalDelete(id, table)
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
    let w = ""
    if (where != "")
        w = "WHERE"

    let query = `SELECT ${columns} FROM ${table} ${w} ${where}`
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

var logicalDelete = (id, table) => {
    let query = `UPDATE ${table} SET status = -1  WHERE id_${table} = ${id}`
    return query
}

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

module.exports = router
