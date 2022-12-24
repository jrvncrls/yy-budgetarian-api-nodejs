const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "id20057486_yobabu",
  database: "id20057486_yybudgetarian",
  password: "Yobabumoney0727!",
  port: 3306,
  multipleStatements: true,
};

// const localDbConfig = {
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   database: "yy-budgetarian",
//   port: 3306,
//   multipleStatements: true,
// };

const db = mysql.createPool(dbConfig);

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
