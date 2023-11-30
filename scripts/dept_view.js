const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'company_db',
    resultFormat: 'table'
  });

function dept_view () {
  db.query('SELECT * FROM department', function (err, results) {
      if (err) throw new Error (err);
      console.table(results);
      //let new_quest = choose_task();
    });
};

module.exports = {dept_view}