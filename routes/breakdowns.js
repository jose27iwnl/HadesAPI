const express = require('express');
const router = express.Router();

const getConnection = require('../utils/mysql');

router.get('', function(req, res, next) {

    getConnection(function(err, conn) {
        conn.query("SELECT b.id, b.description, u.username, r.number, bl.description AS block FROM breakdowns b INNER JOIN users u ON u.id = b.id_user INNER JOIN room r ON r.id = b.id_room INNER JOIN blocks bl ON bl.id = r.id_block WHERE b.enabled = TRUE;", function(err, rows) {
            if (err) throw err;

            res.json(rows);
        }); // query
    }); // connection
}); // router

router.put('', function(req, res, next) {
    getConnection(function(err, conn) {
        conn.query("INSERT INTO breakdowns (description, id_room, id_user) VALUES (?, ?, ?);", [req.body['description'], req.body['id_room'], req.body['id_user']], function(err, rows) {
            if (err) throw err;
            res.json(rows);
        }); // query
    }); // connection
});



router.patch('', function(req, res, next) {
    const idQuery = req.query['id'];

    getConnection(function(err, conn) {
        conn.query("UPDATE breakdowns SET description = ? WHERE id = ?;", [req.body['description'], idQuery], function(err, rows) {
            if (err) throw err;
            res.json(rows);
        }); // query
    }); // connection
});


router.delete('', function(req, res, next) {
    const idQuery = req.query['id'];

    getConnection(function(err, conn) {
        conn.query("UPDATE breakdowns SET enabled = false WHERE id = ?;", [idQuery], function(err, rows) {
            if (err) throw err;
            res.json(rows);
        }); // query
    }); // connection
});

module.exports = router;
