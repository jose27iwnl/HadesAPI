const express = require('express');
const router = express.Router();

const getConnection = require('../utils/mysql');

router.get('', function(req, res, next) {
    getConnection(function(err, conn) {
        conn.query("SELECT * FROM blocks;", function(err, rows) {
            if (err) throw err;
            res.json(rows);
        });
    });
});

router.get('/byID', function(req, res, next) {
    const blockQuery = req.query['block_id'];
    getConnection(function(err, conn) {
        conn.query("SELECT * FROM blocks WHERE ID = ?;", [blockQuery], function(err, rows) {
            if (err) throw err;
            res.json(rows);
        });
    });
});

module.exports = router;