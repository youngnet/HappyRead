const mysql = require("mysql2");
const mysqlConfig = require("../../config.json").mysqlConfig;

const pool = mysql.createPool({
    ...mysqlConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;