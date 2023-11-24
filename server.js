const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
//const {dept_view} = require('./scripts/dept_view');

console.log("Importing Complete");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'company_db'
    });
    
const choose_task = () => {
    inquirer.prompt([
       {
        type:'list',
        message: 'What would you like to do?',
        choices:[`View all departments`, `View all roles`, `View all employees`, `Add a department`, `Add a role`, `Add an employee`, `Update an employee role`,`Exit`],
        name: 'task'
       } 
    ])
    .then((response) => {
    if (response.task === `View all departments`) {
        return dept_view()
    };
    if (response.task === `View all roles`) {
        return role_view()
    };
    if (response.task === `Add a department`) {
        return dept_add()
    };
    if (response.task ===  `Add a role`) {
        return role_add()
    };
    if (response.task === `Add an employee`){
        return employee_add()
    };
    if (response.task === `Update an employee role`){
        return update_role()
    };
    if (response.task === 'Exit') {
        return exit_strat()
    };
    throw new Error (`No table selected, aborting Database`)
    })
};

function dept_view () {
    db.query('SELECT * FROM department', function (err, results) {
                console.log(results);
        let new_quest = choose_task();
      });
}

function role_view () {
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
        let new_quest = choose_task();
      });
}

function exit_strat () {
    return console.log("Press Ctrl C")
}










db.connect(function(err) {
    if (err) throw err;
    console.log(`Connected to the company_db database.`);
    const init = choose_task();
})

app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//module.exports = {db};
