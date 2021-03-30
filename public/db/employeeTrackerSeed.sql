-- start using database
USE employeeTrackerDB;

INSERT INTO people (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 0);

INSERT INTO people (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 1, 0);

INSERT INTO people (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 1, 0);


INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), ("Lawyer", 190000, 4), ("Accountant", 125000, 3);