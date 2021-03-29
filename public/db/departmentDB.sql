-- Create database --
CREATE DATABASE department_db;

-- start using database
USE department_db;

-- Create table "dept" within department_db --
CREATE TABLE dept (
    -- numeric id that will automatically increment
    id INT(255) AUTO_INCREMENT NOT NULL,
    -- make a string for department name
    name VARCHAR (30),
    -- Sets id to table's primary key
    PRIMARY KEY (id)
);