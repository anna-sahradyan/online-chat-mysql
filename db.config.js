const sql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const db = sql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database: "sql_login"
})
module.exports = db;