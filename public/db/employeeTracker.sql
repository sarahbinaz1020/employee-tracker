-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS employeeTrackerDB;

-- Create database --
CREATE DATABASE employeeTrackerDB;

-- start using database
USE employeeTrackerDB;

-- Create table "department" within employeeTracker_db --
CREATE TABLE department (
    -- numeric id that will automatically increment
    id INT(255) AUTO_INCREMENT NOT NULL,
    -- make a string for department name
    name VARCHAR (30) NOT NULL,
    -- Sets id to table's primary key
    PRIMARY KEY (id)
);

-- Create table "people" within employeeTrackerDB --
CREATE TABLE people (
    -- numeric id that will automatically increment
    id INT(255) AUTO_INCREMENT NOT NULL,
    -- make a string for first name
    first_name VARCHAR (30),
    -- make a string for last name
    last_name VARCHAR(30),
    -- numeric value for employee role
    role_id INT NOT NULL,
    -- numeric value for manager for employee being created, can be null
    manager_id INT,
    -- Sets id to table's primary key
    PRIMARY KEY (id)
);

-- Create table "role" within employeeTrackerDB --
CREATE TABLE role (
    -- numeric id that will automatically increment
    id INT(255) AUTO_INCREMENT NOT NULL,
    -- make a string for title
    title VARCHAR (30) NOT NULL,
    -- make an integer decimal for salary (precision, scale)
    salary DECIMAL (7, 0),
    -- numeric value for department role
    department_id INT NOT NULL,
    -- Sets id to table's primary key
    PRIMARY KEY (id)
);