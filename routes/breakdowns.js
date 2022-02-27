const express = require('express');
const router = express.Router();

const getConnection = require('../utils/mysql');

router.get('', function(req, res, next) {
        getConnection(function(err, conn) {
            conn.query("SELECT breakdown.id, reason.reason, breakdown.description, severity.severity, user.username, room.number, block.description AS block FROM breakdowns breakdown " +
                "INNER JOIN users user ON user.id = breakdown.id_user " +
                "INNER JOIN room room ON room.id = breakdown.id_room " +
                "INNER JOIN blocks block ON block.id = room.id_block " +
                "INNER JOIN reasons reason ON reason.id = breakdown.id_reason " +
                "INNER JOIN severity severity ON severity.id = breakdown.id_severity " +
                "WHERE breakdown.enabled = TRUE;", function(err, rows) {
                if (err) throw err;

                res.json(rows);
            });
        });
});

router.put('', function(req, res, next) {
    getConnection(function(err, conn) {
        conn.query("INSERT INTO breakdowns (description, id_severity, id_reason, id_room, id_user) VALUES (?, ?, ?, ?, ?);", [req.body['description'], req.body['id_severity'], req.body['id_reason'], req.body['id_room'], req.body['id_user']], function(err, rows) {
            if (err) throw err;
            res.json(rows);
        });
    });
});



router.patch('', function(req, res, next) {
    const idQuery = req.query['id'];

    getConnection(function(err, conn) {
        conn.query("UPDATE breakdowns SET description = ? WHERE id = ?;", [req.body['description'], idQuery], function(err, rows) {
            if (err) throw err;
            res.json(rows);
        });
    });
});


router.delete('', function(req, res, next) {
    const idQuery = req.query['id'];

    getConnection(function(err, conn) {
        conn.query("UPDATE breakdowns SET enabled = false WHERE id = ?;", [idQuery], function(err, rows) {
            if (err) throw err;
            res.json(rows);
        });
    });
});

module.exports = router;
