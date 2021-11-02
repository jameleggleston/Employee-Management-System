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
