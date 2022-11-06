const inquirer = require("inquirer");
const dbinstance = require("./db/index.js");
const mysql = reqiure("mysql2");
const connection = require("./connection");
const db = require("./db/index.js");

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
