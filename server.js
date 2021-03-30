const mysql = require('mysql');
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'ice_creamDB',
});



connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);

  init();
});

function init(){
  inquirer.prompt([{
    type: "list",
    name: "whatToDo",
    message: "What would you like to do?",
    choices: [
      "Add A Department",
      "Add A Role",
      "Add An Employee",
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Update Employee Role",
      "Exit"
    ]
  }]).then(function(response){
    switch(response.whatToDo){
      case "Add A Department":
        addDepartment();
        break;
      case "Add A Role":
        addRole();
        break;
      case "Add An Employee":
        addEmployee();
        break;
      case "View All Departments":
        viewDepartment();
        break;
      case "View All Roles":
        viewRole();
        break;
      case "View All Employees":
        viewEmployee();
        break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      default:
        connection.end();
    }
  })
}


function addDepartment() {
  inquirer.prompt([{
    type: "list",
    name: "department_add",
    message: "What department would you like to add?",
    choices: ["Sales", "Engineering", "Finance", "Legal"],
  }])
}

function addRole(){
  inquirer.prompt([{
    type: "List",
    name: "title_add",
    message: "What title would you like to add?",
    choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Junior Accountant", "Legal Team Lead", "Lawyer"],
  }])
}

function viewFlavors(){
  connection.query("SELECT * FROM products", function(err, data){
    console.table(data);
    init();
  })
}

function addFlavor(){
  inquirer.prompt([{
    type: "input",
    name: "flavor",
    message: "What flavor would you like to add?"
  },
  {
    type: "input",
    name: "price",
    message: "How much does it cost?"
  },{
    type: "input",
    name: "quantity",
    message: "How many do you have?"
  }]).then(function(response){
    console.log(response);
    const query = "INSERT INTO products (flavor, price, quantity) VALUES (?, ?, ?);";

    const foo = connection.query(query, [response.flavor, response.price, response.quantity], function(err, data){
      console.log("Added flavor", response.flavor);
      console.log(foo.sql);
      init();
    })
  })
}

