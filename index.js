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
        inquirer
        .prompt([
          {
          type: "input",
          name: "department_name",
          message: "Which department would you like to add?",
        }
      ])
      .then(function (response) {
        console.log(response);
        const query =
          "INSERT INTO department (name) VALUES (?);";

        const data = connection.query(
          query,
          [
            response.department_name,
          ],
          function (err, data) {
            console.log(err);
            console.log("Added department", response.department_name);
            init();
          }
          );
        });
  }
  
  function addRole(){
    connection.query("SELECT * FROM role", function (err, role){
      connection.query("SELECT * FROM department", function (err, departments) {
      if (err) throw err;

      inquirer.prompt([
        {
        type: "input",
        name: "title_add",
        message: "What title would you like to add?",
      },
        {
        type: "input",
        name: "salary_add",
        message: "What salary does this position receive?",
      },
        {
        type: "list",
        name: "departmentId_add",
        message: "To which department does this position belong?",
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        }))
      }
      ])
      .then(function (response) {
        console.log(response);
        const query =
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);";

        const data = connection.query(
          query,
          [
            response.title_add,
            response.salary_add,
            response.departmentId_add,
          ],
          function (err, data) {
            console.log(err);
            console.log("Added role", response.title_add);
            init();
          }
          );
        });
    });
  });
}
  
  function addEmployee() {
    connection.query("SELECT * FROM people", function (err, people) {
      connection.query("SELECT * FROM role", function (err, roles) {
        if (err) throw err;
  
        inquirer
          .prompt([
            {
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
              choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
              })),
            },
            {
              type: "list",
              name: "employee_manager",
              message: "Who is the employee's manager?",
              choices: people.map((employee) => ({
                name: employee.first_name + " " + employee.last_name,
                value: employee.id,
              })),
            },
          ])
          .then(function (response) {
            console.log(response);
            const query =
              "INSERT INTO people (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";
  
            const data = connection.query(
              query,
              [
                response.first_name_add,
                response.last_name_add,
                response.employee_role,
                response.employee_manager,
              ],
              function (err, data) {
                console.log(err);
                console.log("Added employee", response.first_name_add);
                init();
              }
            );
          });
      });
    });
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
  
  