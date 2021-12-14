const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const getConnection = require('../utils/mysql');

router.get('', function(req, res, next) {
    const emailQuery = req.query['email'];

    getConnection(function(err, conn) {
        conn.query("SELECT * FROM users WHERE email = ?", [emailQuery], async function (err, rows) {
            if (err) throw err

            const match = await bcrypt.compare(req.query['password'], rows[0]['password']);

            if (match) {
                res.json({
                    'id': rows[0]['id'],
                    'email': rows[0]['email'],
                    'username': rows[0]['username'],
                    'permission': rows[0]['id_permissions']
                })
            } else if (req.query['email'] !== rows[0]['email']) {
                res.json({
                    error: 'Este email não existe'
                });
            } else {
                res.json({
                    error: 'Os dados estão incorretos'
                });
            }
        }); // query
    }); // connection
}); // router

module.exports = router;
