const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.127.126.25",
  user: "root",
  password: "",
  database: "react-pizza",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

module.exports = connection;
