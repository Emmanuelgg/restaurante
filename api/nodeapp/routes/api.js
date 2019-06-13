const express = require('express')
const router = express.Router()
const app = express()
const multer = require('multer')
const mysql = require("mysql")

const storage = multer.diskStorage({
    destination: './public/files/',
    filename(req, file, cb) {
        cb(null, `${file.originalname}`)
    },
})

const upload = multer({ storage })

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


class Database {
    constructor( ) {
        this.connection = mysql.createPool( {
          host     : 'mysqlserver',
          user     : 'root',
          password : '123456',
          database : "db_rest",
          port     : "3306",
          multipleStatements: true
        } )
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

router.post('/file/upload', upload.single('file'), (req, res) => {
    const file = req.body.file; // file passed from client
    let response = {
        status: 200,
        data: file,
        error: null
    }
    res.send(response)
    res.end()

});

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
            let join = req.body.join != undefined ? req.body.join : ""
            let query = select(table, columns, where, join)
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

router.post("/get/foodOrder", (req, res) =>{
    if (req.body != undefined) {
        try {
            let response = {
                status: 200,
                data: {},
                error: null
            }
            let id = req.body.id
            let query = select("food_order", "*", `id_dining_table = ${id} AND status = 1`)
            let database = new Database()
            database.query(query)
                .then( rows => {
                    if (rows.lenght <= 0) {
                        query = insert(
                            "food_order",
                            "id_dining_table, id_food_order_type, total, status, created_at, updated_at",
                            `${id}, 1, 0.00, 1, ${getDateTime()}, ${getDateTime()}`
                        )
                        return database.query(query);
                    }
                } )
                .then( rows => {
                    query = `
                    SELECT fo.id_food_order, fo.id_dining_table, fo.total, fo.created_at, dt.number, dt.name FROM food_order fo
                    LEFT JOIN dining_table dt ON dt.id_dining_table = fo.id_dining_table
                    WHERE dt.id_dining_table = ${id} AND fo.status = 1
                    `
                    return database.query(query)
                } )
                .then( rows => {
                    response.data.food_order = rows
                    query = `
                        SELECT fod.*, p.name FROM food_order_description fod
                        INNER JOIN product p ON fod.id_product = p.id_product
                        WHERE fod.id_food_order = ${rows[0].id_food_order}
                    `
                    return database.query(query)
                } )
                .then( rows => {
                    response.data.food_order_description = rows
                    response.status = 200
                    res.send(response)
                    res.end()
                    return database.close()
                } )

        } catch (e) {

        }

    }
})

router.post('/add/foodOrder', (req, res) => {
    if (req.body != undefined) {
        try {
            let response = {
                status: 200,
                data: {},
                error: null
            }
            connect()
            let id = req.body.id
            let idProduct = req.body.id_product
            let query = `
                SELECT fod.id_food_order_description id_food_order_description, p.name product_name, fod.quantity quantity, p.price price
                FROM food_order fo
                INNER JOIN food_order_description fod ON fod.id_food_order = fo.id_food_order
                INNER JOIN product p ON p.id_product = fod.id_product
                WHERE fo.id_food_order = ${id} AND fod.id_product = ${idProduct}
            `
            connection.query(query, function(err, rows, fields) {
                if (err) {
                    response.error = err
                    response.status = 500
                } else {
                    rows = JSON.stringify(rows)
                    rows = JSON.parse(rows)
                    if (rows[0] != undefined) {
                        let quantity = rows[0].quantity + 1
                        let price = rows[0].price
                        let total = quantity * price
                        query = update(
                            rows[0].id_food_order_description,
                            "food_order_description",
                            "quantity, product_name, price, total",
                            `${quantity},${rows[0].product_name},${price},${total}`
                        )
                        connection.query(query, function(err, rows, fields) {
                            if (err) {
                                response.error = err
                                response.status = 500
                            } else {
                                response.error = rows
                                response.status = 200
                            }
                            res.send(response)
                            res.end()
                        })
                        connection.end()
                    } else {
                        query = select(
                            "product",
                            "*",
                            `id_product = ${idProduct}`
                        )
                        connection.query(query, function(err, rows, fields) {
                            if (err) {
                                response.error = err
                                response.status = 500
                            } else {
                                rows = JSON.stringify(rows)
                                rows = JSON.parse(rows)
                                if (rows[0] != undefined) {
                                    query = insert(
                                        "food_order_description",
                                        "id_food_order, id_product, quantity, product_name, price, total",
                                        `${id},${idProduct},1,${rows[0].name},${rows[0].price},${rows[0].price}`
                                    )
                                    connection.query(query, function(err, rows, fields) {
                                        if (err) {
                                            response.error = err
                                            response.status = 500
                                            console.log(err);
                                        } else {
                                            response.error = rows
                                            response.status = 200
                                        }
                                        res.send(response)
                                        res.end()
                                    })
                                    connection.end()
                                }
                            }
                        })
                    }
                }
            })

        } catch (e) {
            response.status = 500
            console.log(e)
            res.send(e)
            res.end()
        }
    }
})

router.post('/delete', (req, res) => {
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
            let query = permanentDelete(id, table)
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

router.post('/update', (req, res) => {
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
            let columns = req.body.columns
            let values = req.body.values
            let query = update(
                id,
                table,
                `${columns}`,
                `${values}`
            )
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

var select = (table, columns = "*", where, join = "") => {
    let w = ""
    if (where != "")
        w = "WHERE"

    let query = `SELECT ${columns} FROM ${table} ${join} ${w} ${where}`
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

var permanentDelete = (id, table) => {
    let query = `DELETE FROM ${table} WHERE id_${table} = ${id}`
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
