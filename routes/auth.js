const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const getConnection = require('../utils/mysql');

router.get('', function(req, res, next) {
    const emailQuery = req.query['email'];

    getConnection(function(err, conn) {
        if (err) throw err
        conn.query("SELECT * FROM users WHERE email = ?", [emailQuery], async function (err, rows) {
            if (err) throw err

            // If email exists
            if (rows && rows.length === 1) {
                const match = await bcrypt.compare(req.query['password'], rows[0]['password']);

                if (match) {
                    res.json({
                        'id': rows[0]['id'],
                        'email': rows[0]['email'],
                        'username': rows[0]['username'],
                        'permission': rows[0]['id_permissions']
                    });
                } else {
                    res.status(400).json({
                        error: 'Wrong password.',
                        type: 'password'
                    });
                }
            } else {
                res.status(400).json({
                    error: 'This email doesnt exist',
                    type: 'email'
                });
            }
        });
    });
});

module.exports = router;
