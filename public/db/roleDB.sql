-- Create database --
CREATE DATABASE employeeTrackerDB;

-- start using database
USE employeeTrackerDB;

-- Create table "role" within employeeTrackerDB --
CREATE TABLE role (
    -- numeric id that will automatically increment
    id INT(255) AUTO_INCREMENT NOT NULL,
    -- make a string for title
    title VARCHAR (30) NOT NULL,
    -- make an integer decimal for salary (precision, scale)
    salary DECIMAL (5, 0),
    -- numeric value for department role
    department_id INT NOT NULL,
    -- Sets id to table's primary key
    PRIMARY KEY (id)
);