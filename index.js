const inquirer = require("inquirer");
// const dbinstance = require("./db/index.js");
const mysql = require("mysql2");
// const connection = require("./connection");
const db = require("./db/index.js");
const mysql = require("mysql2");
const cTable = require("console.table");

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Password",
    database: "employee_db",
  },
  console.log("Connected to database.")
);

connection.connect((err) => {
  if (err) throw err;
  loadPrompts();
});

// Initial questions prompt
function loadPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Welcome, what would you like to do?",
        choices: [
          {
            name: "View all departments",
            value: "all_departments",
          },
          {
            name: "Add department",
            value: "add_department",
          },
          {
            name: "View all roles",
            value: "all_roles",
          },
          {
            name: "Add role",
            value: "add_role",
          },
          {
            name: "View all employees",
            value: "all_employees",
          },
          {
            name: "Add employee",
            value: "add_employee",
          },
          {
            name: "Update employee roll",
            value: "update_employee",
          },
          {
            name: "Exit",
            value: "exit",
          },
        ],
      },
    ])
    .then((res) => {
      switch (res.choices) {
        case "all_departments":
          viewDepartments();
          break;
        case "add_department":
          addDepartment();
          break;
        case "all_role":
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
        default:
          db.end();
          return;
      }
    });
}

//write database action functions
//function to view all departments
viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, result) => {
    if (err) throw err;
    cTable(result);
    loadPrompts();
  });
};

// addDepartment(); => {}

// function to view all roles
viewRoles = () => {
  connection.query("SELECT * FROM roles", (err, result) => {
    if (err) throw err;
    cTable(result);
    loadPrompts();
  });
};

// addRole = () => {}

//function to view all employees
viewAllEmployees = () => {
  connection.query("SELECT * FROM employee", (err, result) => {
    if (err) throw err;
    cTable(result);
    loadPrompts();
  });
};
// addEmployee = () => {}

// updateEmployee = () => {}
