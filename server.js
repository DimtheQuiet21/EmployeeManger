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
      database: 'company_db',
      resultFormat: 'table'
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
    if (response.task === `View all employees`) {
        return employee_view()
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
        return employee_update()
    };
    if (response.task === 'Exit') {
        return exit_strat()
    };
    throw new Error (`No table selected, aborting Database`)
    })
};

function dept_view () {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) throw new Error (err);
        console.table(results);
        let new_quest = choose_task();
      });
};

function role_view () {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) throw new Error (err);
        console.table(results);
        let new_quest = choose_task();
      });
};

function employee_view () {
    //formatted table showing employee data,
    // including employee ids, first names, last names, job titles
    let statement = 
    `SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Job_Title
     FROM employee
     JOIN role ON employee.role_id = role.id;`
    ;
    db.query(statement, function (err, results) {
        if (err) throw new Error (err);
        console.table(results);
        let new_quest = choose_task();
      });
};

function dept_add () {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new department?',
            name:'new_dept'
        }
    ]).then((response) => {
        let new_id = '';
        db.query(`SELECT COUNT(*) FROM department`, function (err,results) {
            if (err) throw new Error (err);
            new_id = Object.values(results[0])[0] +1; // this is dumb, but I can't easily access the 'COUNT(*)' property handle 
            console.log(new_id);
            let statement = 
            `INSERT INTO department (id, dept_name)
            VALUES ('${new_id}', '${response.new_dept}')`;
            db.query(statement,function (err,results) {
                console.log(results)
                if (err) throw new Error (err);
                dept_view();
            });
        })
    });
};

function role_add() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new role?',
            name:'new_role'
        },
        {
            type: 'input',
            message: 'What is the salary for the new role? (Please input only a number)',
            name:'new_salary'
        },
        {
            type: 'input',
            message: 'Which department has the new role? (Please input a valid ID)',
            name:'dept_id'
        }
    ]).then((response) => {
        let dept_check = db.query(`SELECT id FROM department WHERE id = ${response.dept_id}`, function (err,results) {
            if (err) {throw new Error ('Query Failed')};
            //console.log(results[0].id);
            try {
                if (results[0].id && typeof(parseInt(response.new_salary)) =='number') {
                    let new_id = '';
                    db.query(`SELECT COUNT(*) FROM role`, function (err,results) {
                        if (err) throw new Error (err);
                        new_id = Object.values(results[0])[0] +1; // this is dumb, but I can't easily access the 'COUNT(*)' property handle 
                        //console.log(new_id);
                        let statement = 
                        `INSERT INTO role (id, title, salary, dept_id)
                        VALUES ('${new_id}', '${response.new_role}', '${response.new_salary}', '${response.dept_id}')`;
                        db.query(statement,function (err,results) {
                            console.log(results)
                            if (err) throw new Error (err);
                            role_view();
                        });
                    })
                } else {
                    console.log('Please enter an valid salary or department id');
                    role_add();
                };
            } catch { 
                console.log (`Something went wrong in your query. Please double check that you are putting in a number for the salary and a viable department id number`);
                role_add();
            };
        });
    });       
};

function employee_add() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the employee?',
            name:'first_name'
        },
        {
            type: 'input',
            message: 'What is the last name of the employee?',
            name:'last_name'
        },
        {
            type: 'input',
            message: 'What is the role id of the new employee? (Please input only a valid ID number)',
            name:'role_id'
        },
        {
            type: 'input',
            message: 'What is the manager id of the new employee? (Please input only a valid ID number)',
            name:'manager_id'
        }
    ]).then((response) => {
        let statement = `
        SELECT
        (SELECT id FROM department WHERE id = ${response.role_id}) as role_id,
        (SELECT id FROM employee WHERE id = ${response.manager_id}) as manager_id`;
        let empl_check = db.query(statement, function (err,results) {
            if (err) {throw new Error ('Query Failed')};
            //console.log(results[0].role_id,results[0].manager_id);
            try {
                if (results[0].role_id && results[0].manager_id) {
                let new_id = '';
                    db.query(`SELECT COUNT(*) FROM employee`, function (err,results) {
                        if (err) throw new Error (err);
                        new_id = Object.values(results[0])[0] +1; // this is dumb, but I can't easily access the 'COUNT(*)' property handle 
                        //console.log(new_id);
                        let statement = 
                        `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
                        VALUES ('${new_id}', '${response.first_name}', '${response.last_name}', '${response.role_id}','${response.manager_id}')`;
                        db.query(statement,function (err,results) {
                            console.log(results)
                            if (err) throw new Error (err);
                            employee_view();
                        });
                    })
                } else {
                    console.log('Please enter an valid salary or department id');
                    employee_add();
                };
            } catch { 
                console.log (`Something went wrong in your query. Please double check that you are putting in a number for the role id number and manager id are valid`);
                employee_add();
            };
        });
    });
};

function employee_update (){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employees ID?',
            name:'employee_id'
        },
        {
            type: 'input',
            message: 'What is the new role id of the new employee? (Please input only a valid ID number)',
            name:'role_id'
        }
    ]).then((response) => {
        let statement = `
        SELECT id FROM employee WHERE id = ${response.employee_id}`;
        let empl_check = db.query(statement, function (err,results) {
            if (err) {throw new Error (err, 'Query Failed')};
            try {
                if (results[0].id) {
                    db.query(`UPDATE employee SET role_id = ${response.role_id} WHERE id = ${response.employee_id}`, function (err,results) {
                        if (err) {throw new Error (err, 'Update Failed')}
                        employee_view();
                    });
                };
            } catch {
                console.log (`Something went wrong in your query. Please double check that you are putting in a valid employee id`);
                employee_update();
            };
        });
    });
};

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
