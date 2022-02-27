const express = require('express');
const router = express.Router();

const getConnection = require('../utils/mysql');

router.get('', function(req, res, next) {
    getConnection(function(err, conn) {
        conn.query("SELECT * FROM reasons;", function(err, rows) {
            if (err) throw err;
            res.json(rows);
        });
    });
});

module.exports = router;