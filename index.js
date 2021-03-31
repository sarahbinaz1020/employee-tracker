const connection = require("./public/db");
const inquirer = require("inquirer");

// init();

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
    // init();
  }
  
  function addRole(){
    inquirer.prompt([{
      type: "List",
      name: "title_add",
      message: "What title would you like to add?",
      choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Junior Accountant", "Legal Team Lead", "Lawyer"],
    }])
    // init();
  }
  
  function addEmployee(){
    const query = "SELECT * FROM people";
    connection.query(query, function(err, response) {
      if(err) throw err;
      const managerArray = [];
      response.map(function (x){
        let tempObj = {
          name: x.first_name,
          value: x.id,
        }
        managerArray.push(tempObj);
        console.log(x.first_name)
      
      })
      
      const roleArray = [];
      response.map(function (x){
        let tempObj2 = {
          name: x.role_name,
          value: x.id,
        }
        roleArray.push(tempObj2);
        console.log(x.first_name)
      
      })
      // console.log(managerArray);
    
      inquirer.prompt([{
          type: "input",
          name: "first_name_add",
          message: "What is the employee's first name?",
          },
        {
            type: "input",
            name: "last_name_add",
            message: "What is the empoyee's last name?",
        },
        {
            type: "list",
            name: "employee_role",
            message: "What is the employee's role?",
            choices: roleArray
        },
        {
            type: "list",
            name: "employee_manager",
            message: "Who is the employee's manager?",
            choices: managerArray,
        }, 
    ]).then(function(response){
              console.log(response);
              const query = "INSERT INTO people (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";
          
              const data = connection.query(query, [response.first_name_add, response.last_name_add, response.employee_role, response.employee_manager], function(err, data){
                console.log(err);
                console.log("Added employee", response.first_name_add);
        init();
    })
})})
  }

  function viewDepartment(){
    //   need to add inner join to see all parts
    connection.query("SELECT * FROM department", function(err, data){
        console.table(data);
        // init();
    })
  }

  function viewRole(){
    //   need to add in inner join to see 
      connection.query("SELECT * FROM role", function(err, data){
          console.table(data);
          // init();
      })
  }

  function viewEmployee(){
    connection.query("SELECT * FROM people", function(err, data){
        console.table(data);
        // init();
    })
  }

  function updateEmployeeRole(){
    inquirer.prompt([{
        type: "list",
        name: "update_employee",
        message: "Which employee would you like to update",
        choices: [""],
        }])
  }
//   function viewFlavors(){
//     connection.query("SELECT * FROM products", function(err, data){
//       console.table(data);
//       init();
//     })
//   }
  
//   function addFlavor(){
//     inquirer.prompt([{
//       type: "input",
//       name: "flavor",
//       message: "What flavor would you like to add?"
//     },
//     {
//       type: "input",
//       name: "price",
//       message: "How much does it cost?"
//     },{
//       type: "input",
//       name: "quantity",
//       message: "How many do you have?"
//     }]).then(function(response){
//       console.log(response);
//       const query = "INSERT INTO products (flavor, price, quantity) VALUES (?, ?, ?);";
  
//       const foo = connection.query(query, [response.flavor, response.price, response.quantity], function(err, data){
//         console.log("Added flavor", response.flavor);
//         console.log(foo.sql);
//         init();
//       })
//     })
//   }
  
  