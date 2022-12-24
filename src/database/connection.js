const mysql = require("mysql");

const dbConfig = {
  host: "sql6.freesqldatabase.com",
  user: "sql6583721",
  database: "sql6583721",
  password: "mfxPL4TVDW",
  port: 3306,
  multipleStatements: true,
};

const localDbConfig = {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "yy-budgetarian",
  port: 3306,
  multipleStatements: true,
};

const db = mysql.createPool(localDbConfig);

module.exports = (query) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, sql) => {
      if (err) {
        reject(err);
      } else {
        sql.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }

          sql.release();
        });
      }
    });
  });
};
