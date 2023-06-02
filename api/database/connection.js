//Connection on database
let mysql = require("mysql");

let con = mysql.createConnection({
  host: process.env.LOCALHOST,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
  database: process.env.DBNAME,
});

let con2 = mysql.createPool({
  host: process.env.LOCALHOST,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
});

con.on("error", function (err) {
  console.log("[mysql error]", err);
});

con2.on("error", function (err) {
  console.log("[mysql error]", err);
});

module.exports = {
  //for normal query call
  connection: function (query) {
    return new Promise((resolve, reject) => {
      con.connect((err) => {
        console.log(err);
        if (err) reject(err);
        con.query(query, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    });
  },
  //for Stored Procedure call
  connectionSP: function (query) {
    return new Promise((resolve, reject) => {
      con2.getConnection((err, connection) => {
        connection.query(query, function (err, rows) {
          connection.release();
          if (err) reject(err);
          resolve(rows[0][0]);
        });
      });
    });
  },
};
