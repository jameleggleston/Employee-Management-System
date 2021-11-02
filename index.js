const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const db_connection = mysql.createConnection(

    {
        host: "localhost",
        port: "3306",
        user: "root",
        password: "Myworld12!",
        database: "company_db",
    },
    console.log("Connected to company_db")
);

db_connection.connect(function (err) {
    if (err) throw err;
    start();
})

const start = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "choice",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add a employee",
                    "Update an employee role"
                ],
            },
        ])

        .then(function(val) {
            switch (val.choice) {

                case "View all departments":
                    viewAllDepartments();
                    break;

                case "View all roles":
                    viewAllRoles();
                    break;

                case "View all employees":
                    viewAllEmployees();
                    break;

                case "Add a department":
                    addAdepartment();
                    break;

                case "Add a role":
                    addArole();
                    break;

                case "Add a employee":
                    addAemployee();
                    break;

                case "Update an employee role":
                    updateEmployeeRole();
                    break;
            }
        });
};

const viewAllDepartments = () => {

    const query = "SELECT * FROM department;";
    db_connection.query(query,

        function (err, res) {
            if (err) throw err
            console.table(res);
            start();  
        });
};

const viewAllRoles = () => {

    const query = `SELECT id, title, salary FROM role;`;
    db_connection.query(query,

        function (err, res) {
            if (err) throw err
            console.table(res);
            start();
        });

};

const viewAllEmployees = () => {

    const query = "SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title, role.salary, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;";
    db_connection.query(query,

        function (err, res) {
            if (err) throw err
            console.table(res);
            start();
        });

};

const addAdepartment = () => {

    inquirer.prompt([
       {
           name:"Name",
           type:"input",
           message:"What department are you looking to add?",
       } 
    ]).then(function(res){
        const query = "INSERT INTO department SET ?";
        db_connection.query(query,
            {
                name: res.Name
            },
            function (err) {
                if (err) throw err
                console.table(res);
                start();
            })
    })
};

const addArole = () => {

    const query = `SELECT role.title, role.salary FROM role`;
    db_connection.query(query, function(err, res) {
        inquirer.prompt([{
                name: "Title",
                type: "input",
                message: "What is the roles Title?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the Salary?"
            }
        ]).then(function(res) {
            db_connection.query(
                "INSERT INTO role SET ?", {
                    title: res.Title,
                    salary: res.Salary,
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    start();
                }
            )
        });
    });
};

let roleArr = [];
const selectRole = () => {
    const query = "SELECT * FROM role";
    db_connection.query(query, function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
};

let managersArr = [];
const selectManager = () => {
    const query = `SELECT first_name, last_name FROM employee WHERE manager_id IS NULL`;
    db_connection.query(query, function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }
    })
    return managersArr;
};


const addAemployee = () => {

        inquirer.prompt([{
            name: "first_name",
            type: "input",
            message: "Enter employee first name"
        },
        {
            name: "last_name",
            type: "input",
            message: "Enter employee last name"
        },
        {
            name: "role",
            type: "list",
            message: "What is this employees role?",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "list",
            message: "Who is this employees manager?",
            choices: selectManager()
        }
    ]).then(function(val) {

            const roleId = selectRole().indexOf(val.role) + 1;
            const managerId = selectManager().indexOf(val.choice) + 1;

            db_connection.query("INSERT INTO employee SET ?", {
                first_name: val.first_name,
                last_name: val.last_name,
                manager_id: managerId,
                role_id: roleId
            }, function(err) {
                if (err) throw err
                console.table(val)
                start()
            })
        })
};



const updateEmployeeRole = () => {

    const query = `SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id`;
    db_connection.query(query, function(err, res) {

        if (err) throw err
        inquirer.prompt([{
                name: "lastName",
                type: "rawlist",
                choices: function() {
                    let lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the Employee's last name?",
            },
            {
                name: "role",
                type: "rawlist",
                message: "What is the Employees new title?",
                choices: selectRole()
            },
        ]).then(function(val) {

            let roleId = selectRole().indexOf(val.role) + 1;
            db_connection.query("UPDATE employee SET ? WHERE ?", [{
                    last_name: val.lastName,

                }, {
                    role_id: roleId

                }],
                function(err) {
                    if (err) throw err
                    console.table(val)
                    start()
                })
        });
    });
};