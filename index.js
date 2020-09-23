var mysql = require("mysql");
const inquirer = require('inquirer');
const { identity } = require("rxjs");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "workplaceDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    options();
});

function printTables(){
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept, role.salary, employee.manager_id "
    + "FROM employee INNER JOIN department ON employee.id = department.id "
    + "INNER JOIN role ON employee.id = role.id",
    
    function(err,res){
        if (err) throw err;
        console.table(res);
        options();
    });
}
function removeEmployee(){
    connection.query("SELECT CONCAT(first_name, ' ', last_name) AS newColumn FROM employee", function(err, results) {
        if (err) throw err;
    inquirer.prompt([
        {
            name: 'choice',
            type: 'rawlist',
            message: 'Select the employee you would like to remove ',
            choices: results.map(item => item.newColumn)
        }

    ]) .then(function(answers) {
        var person = answers.choice;
        var fName = person.split(" ")[0];
        var lName = person.split(" ")[1];
        connection.query("DELETE FROM employee WHERE ? AND ?",[{first_name: fName}, {last_name: lName}],function(err,res){
            if (err) throw err;
            console.log("Removed employee from database\n");
            options();
        });
    });
});
}

function options(){
    inquirer.prompt([
        {
            name: 'choice',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: ["View all employees", "Remove employee", "Add employee", "Add roles", "Add department", "View roles", "View department"]
        }
    ])
    .then(function(answers){
        if(answers.choice === "View all employees")
        {
            printTables();
        }
        else if(answers.choice === "Remove employee")
        {
            removeEmployee();
        }
        else if (answers.choice === "Add employee")
        {
            addEmployee();
        }
        else if (answers.choice === "Add roles")
        {
            addRoles();
        }
        else if (answers.choice === "Add department")
        {
            addDepartment();
        }
        else if (answers.choice === "View roles")
        {
            viewRoles();
        }
        else if (answers.choice === "View department")
        {
            viewDepartment();
        }
    });
}

var rolesArray = ["Sales Lead", "Salesperson", "Account Manager", "Accountant","Legal Team Lead"];
var deptArray = ['Sales', 'Engineering', 'Finance', 'Legal'];

function addEmployee(){
    connection.query("SELECT CONCAT(first_name, ' ', last_name) AS newColumn FROM employee", function(err, results) {
        if (err) throw err;
        
    inquirer.prompt([
        {
            name: 'fname',
            message: 'Enter the first name of the employee: '
        },
        {
            name: 'lname',
            message: 'Enter the last name of the employee: '
        },
        {
            name: 'rtitle',
            type: 'rawlist',
            message: 'Select the role of the employee',
            choices: rolesArray
        },
        {
            name: 'depart',
            type: 'rawlist',
            message: 'Select the department of the employee',
            choices: deptArray
        },
        {
            name: 'rsalary',
            message: 'Enter the salary of the employee: '
        }
    ]) 
    .then(function (answers){

        connection.query("INSERT INTO employee (first_name, last_name) VALUES (?, ?)", [[answers.fname], [answers.lname]], function(err,res){
            if (err) throw err;
        });
        connection.query("INSERT INTO role (title, salary) VALUES (?, ?)", [[answers.rtitle], [answers.rsalary]], function(err,res){
            if (err) throw err;
        });
        connection.query("INSERT INTO department (dept) VALUES (?)", [[answers.depart]], function(err,res){
            if (err) throw err;
        });
      options();

    });
    });
    
}


function addRoles()
{
    inquirer.prompt([
        {
            name: 'role',
            message: 'Enter the role you want to add '
        },

    ]) 
    .then(function (answers){
        rolesArray.push(answers.role);
        connection.query("INSERT INTO role (title) VALUES (?)", [[answers.role]], function(err,res){
            if (err) throw err;
            options();
        });
        
    });
    
}
function addDepartment()
{
    inquirer.prompt([
        {
            name: 'dept',
            message: 'Enter the department you want to add '
        },

    ]) 
    .then(function (answers){
         connection.query("INSERT INTO department (dept) VALUES (?)", [[answers.dept]], function(err,res){
            if (err) throw err;
        });
        deptArray.push(answers.dept);
        options();
    });
}
function viewRoles()
{
    connection.query("SELECT title FROM role ", function(err,res){
        if (err) throw err;
        console.table(res);
        options();
    });
}

function viewDepartment()
{
    connection.query("SELECT dept FROM department ", function(err,res){
        if (err) throw err;
        console.table(res);
        options();
    });
}
