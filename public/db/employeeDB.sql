-- Create database --
CREATE DATABASE employee_db;

USE employee_db;

-- Create table "people" within employee_db --
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