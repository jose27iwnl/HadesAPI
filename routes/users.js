const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const getConnection = require('../utils/mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  getConnection(function(err, conn) {
    conn.query("SELECT ID, Email FROM users", function(err, rows) {
      if (err) throw err

      res.json({
        'id': rows[0]['ID'],
        'email': rows[0]['Email']
      });

    });
  });
});

router.put('', async function (req, res, next) {
  let encryptedPassword = await bcrypt.hash(req.body['password'], 10);

  getConnection(function (err, conn) {
    conn.query("INSERT INTO users (email, username, password, id_permissions) VALUES (?, ?, ?, 1);", [req.body['email'], req.body['username'], encryptedPassword], function (err, rows) {
      if (err) throw err;
      res.json(rows);
    }); // query
  }); // connection
});

router.patch('', function(req, res, next) {
  const idQuery = req.query['id'];

  getConnection(function(err, conn) {
    conn.query("UPDATE users SET EMAIL = ?, Username = ? WHERE id = ?;", [req.body['email'], req.body['username'], idQuery], function(err, rows) {
      if (err) throw err;
      res.json(rows);
    }); // query
  }); // connection
});

module.exports = router;
