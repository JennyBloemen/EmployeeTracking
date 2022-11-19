const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const { isBuffer } = require("util");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//code block to create a connection to the db.
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
        loop: false,
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
        case "Add role":
          addRole();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee roll":
          updateEmployee();
          break;
        case "exit":
          db.end();
          break;
      }
    });
};

// //function to view all departments
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

// code block to add department
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
        console.log(" Department successfully added!");
        initialPrompt();
      });
    });
};

// function to view all roles
viewRoles = () => {
  connection.query(
    "SELECT role.id, role.title, role.salary, role.salary FROM role",
    (err, result) => {
      if (err) throw err;
      console.table(result);
      initialPrompt();
    }
  );
};

// code block to add a role
addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What role would you like to add?",
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log("Please add role.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Enter salary for this role.",
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log("Please add salary.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter deparment id for this role.",
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log("Please add role id.");
            return false;
          }
        },
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: res.title,
          salary: res.salary,
          department_id: res.department_id,
        },
        (err, res) => {
          if (err) throw err;
          console.log("Role added Successfully!");
          initialPrompt();
        }
      );
    });
};

//function to view all employees
viewAllEmployees = () => {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id FROM employee",
    (err, result) => {
      if (err) throw err;
      console.table(result);
      initialPrompt();
    }
  );
};

// code block to add an employee
addEmployee = () => {
  connection.query("SELECT * FROM role", (err, result) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter employee's first name:",
          validate: (first_name) => {
            if (first_name) {
              return true;
            } else {
              console.log("Please add first name.");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "last_name",
          message: "Enter employee's last name:",
          validate: (last_name) => {
            if (last_name) {
              return true;
            } else {
              console.log("Please add last name.");
              return false;
            }
          },
        },
        {
          type: "list",
          name: "role_id",
          message: "Select role id for this employee:",
          choices: result.map((role) => ({
            name: role.title + " " + role.id,
            value: role.id,
          })),
          validate: (title) => {
            if (title) {
              return true;
            } else {
              console.log("Please add role id.");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "manager_id",
          message: "Enter manager id for this role:",
          validate: (manager_id) => {
            if (manager_id) {
              return true;
            } else {
              console.log("Please add manager id.");
              return false;
            }
          },
        },
      ])
      .then((res) => {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: res.first_name,
            last_name: res.last_name,
            role_id: res.role_id,
            manager_id: res.manager_id,
          },
          (err, res) => {
            if (err) throw err;
            console.log("Employee added Successfully!");
            initialPrompt();
          }
        );
      });
  });
};

updateEmployee = () => {
  connection.query("SELECT * FROM employee", (err, result) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to update",
          choices: result.map(
            (employee) => employee.first_name + " " + employee.last_name
          ),
          validate: (name) => {
            if (name) {
              return true;
            } else {
              console.log("Please update role");
              return false;
            }
          },
        },
      ])
      .then((data) => {
        const employee = result.find(
          (employee) =>
            employee.first_name + " " + employee.last_name === data.name
        );
        connection.query("SELECT * FROM role", (err, res) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "Please enter role?",
                choices: res.map((role) => role.title),
                validate: (title) => {
                  if (title) {
                    return true;
                  } else {
                    console.log("Please update role.");
                    return false;
                  }
                },
              },
            ])
            .then((data) => {
              const roleTitle = res.find((role) => role.title === data.role);
              connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
                roleTitle.id,
                employee.id,
              ]);
              console.log(`Employee role updated successfully!`);
              initialPrompt();
            });
        });
      });
  });
};
