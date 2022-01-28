const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const getConnection = require('../utils/mysql');

router.get('/', function(req, res, next) {
    getConnection(function(err, conn) {
      conn.query("SELECT ID, Email FROM users", function(err, rows) {
        if (err) throw err;

        res.json({
          'id': rows[0]['ID'],
          'email': rows[0]['Email']
        });

      });
    });
});

router.put('', async function (req, res, next) {


  let email = req.body['email'];
  let username = req.body['username'];
  let password = req.body['password'];

  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexUsername = /^[a-zA-Z0-9_.-]{3,12}$/;
  const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;

  if (!email.match(regexEmail)) {
    res.status(400).json({
      error: 'The field \'email\' needs to use usual format of an email (account@host.domain; begin by a lowercase or a digit, which may contain, in addition to lowercase and digits: \'.\' (dot) and “-” (dash))',
      type: 'email'
    });
    return;
  }

  if (!username.match(regexUsername)) {
    res.status(400).json({
      error: 'Field \'username\' must start with a lowercase, followed by 3 to 9 characters from the following set: lowercase, digits, “_” (underscore) or “.” (Score)',
      type: 'username'
    });
    return;
  }

  if (!password.match(regexPassword)) {
    res.status(400).json({
      error: 'The field \'password\' needs to have a minimum of 8 characters and maximum of 25; must have at least each one of the following characters: a lowercase, an uppercase, a digit and a character not alphanumeric',
      type: 'password'
    });
    return;
  }

  let encryptedPassword = await bcrypt.hash(req.body['password'], 10);

  getConnection(function (err, conn) {
    conn.query("SELECT * FROM users WHERE email=\"" + email + "\"", function (err, rows) {
      if (err) throw err;
      if (rows.length > 0) {
        res.status(400).json({
          error: 'This email already exists.',
          type: 'email'
        });
      } else {
        conn.query("SELECT * FROM users WHERE username=\"" + username + "\"", function (err, rows) {
          if (err) throw err;
          if (rows.length > 0) {
            res.status(400).json({
              error: 'This username already exists.',
              type: 'username'
            });
          } else {
            conn.query("INSERT INTO users (email, username, password, id_permissions) VALUES (?, ?, ?, 1);", [req.body['email'], req.body['username'], encryptedPassword], function (err, rows) {
              if (err) throw err;
              res.json(rows);
            });
          }
        });
      }
    });
  });
});

router.patch('', function(req, res, next) {
  const idQuery = req.query['id'];

  getConnection(function(err, conn) {
    conn.query("UPDATE users SET EMAIL = ?, Username = ? WHERE id = ?;", [req.body['email'], req.body['username'], idQuery], function(err, rows) {
      if (err) throw err;
      res.json(rows);
    });
  });
});

module.exports = router;
