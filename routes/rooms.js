const express = require('express');
const router = express.Router();

const getConnection = require('../utils/mysql');

router.get('', function(req, res, next) {
    const blockQuery = req.query['block_id'];
    getConnection(function(err, conn) {
        conn.query("SELECT DISTINCT room.id, room.number FROM room, blocks WHERE room.id_block = " + blockQuery + ";", function(err, rows) {
            if (err) throw err;
            res.json(rows);
        });
    });
});

module.exports = router;