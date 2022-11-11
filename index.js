const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
// const connection = require("./connection");
// const dbinstance = require("./db/index.js");
const db = require("./db/index.js");

const { isBuffer } = require("util");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Password",
    database: "employee_db",
    // multipleStatements: true,
  },
  console.log("Connected to database.")
);

connection.connect((err) => {
  if (err) throw err;
  initialPrompt();
});

// Initial questions prompt
initialPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "request",
        message: "Welcome, what would you like to do?",
        choices: [
          "View all departments",
          "Add department",
          "View all roles",
          "Add role",
          "View all employees",
          "Add employee",
          "Update employee roll",
          "Quit",
        ],
        // loop: false,
      },
    ])
    .then((data) => {
      switch (data.request) {
        case "View all departments":
          viewDepartments();
          break;
        case "Add department":
          addDepartment();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "add_role":
          addRole();
          break;
        case "all_employees":
          viewAllEmployees();
          break;
        case "add_employee":
          addEmployee();
          break;
        case "update_employee":
          updateEmployee();
          break;
        case "exit":
          db.end();
          break;
      }
    });
};

// //write database action functions
// //function to view all departments
// let department = [];

viewDepartments = () => {
  connection.query(
    "SELECT department.id, department.department_name FROM department",
    (err, result) => {
      if (err) throw err;
      console.table(result);
      initialPrompt();
    }
  );
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What department would you like to add?",
        validate: (addDept) => {
          if (addDept) {
            return true;
          } else {
            console.log("Please add department");
            return false;
          }
        },
      },
    ])
    .then((res) => {
      let sql = `INSERT INTO department (department_name) VALUES("${res.department_name}")`;
      connection.query(sql, (err, res) => {
        if (err) throw err;
        console.log(`${res.department_name} Successfully added!`); ///need to figure out what goes here to grab the last dep added
        // would like to add if would you like to add another department
        initialPrompt();
      });
    });
};
// function to view all roles
viewRoles = () => {
  connection.query("SELECT * FROM roles", (err, results) => {
    if (err) throw err;
    cTable(results);
    loadPrompts();
  });
};

// // addRole = () => {}

// //function to view all employees
// viewAllEmployees = () => {
//   connection.query("SELECT * FROM employee", (err, results) => {
//     if (err) throw err;
//     cTable(results);
//     loadPrompts();
//   });
// };
// // addEmployee = () => {}

// // updateEmployee = () => {}

//   {
//     name: "View all departments",
//     value: "all_departments",
//   },
//   {
//     name: "Add department",
//     value: "add_department",
//   },
//   {
//     name: "View all roles",
//     value: "all_roles",
//   },
//   {
//     name: "Add role",
//     value: "add_role",
//   },
//   {
//     name: "View all employees",
//     value: "all_employees",
//   },
//   {
//     name: "Add employee",
//     value: "add_employee",
//   },
//   {
//     name: "Update employee roll",
//     value: "update_employee",
//   },
//   {
//     name: "Exit",
//     value: "exit",
//   },
// ],
//   },
// ])
