const express = require('express');
const router = express.Router();

const getConnection = require('../utils/mysql');

router.get('', function(req, res, next) {

    getConnection(function(err, conn) {
        conn.query("SELECT r.id, r.number, b.description FROM room r INNER JOIN blocks b ON b.id = r.id_block;", function(err, rows) {
            if (err) throw err;

            res.json(rows);
        }); // query
    }); // connection
}); // router

module.exports = router;