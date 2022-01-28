const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hermes'
});

const getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
        connection.release();
    });
};

module.exports = getConnection;
