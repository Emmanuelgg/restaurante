const express = require('express');
const router = express.Router();
const app = express();


var mysql = require("mysql");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : '123456',
  database : "db_rest",
});

connection.connect();

router.post('/get/product/all', (req, res) => {
    // req.body
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;
      console.log('The solution is: ', rows[0].solution);
    })
});



connection.end();

module.exports = router;
