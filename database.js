const mysql = require("mysql2/promise");
exports.pool = mysql.createPool({
  host: "3.39.32.160",
  user: "andy",
  port: "3306",
  password: "2@@2@2@5",
  database: "todoDB",
});
