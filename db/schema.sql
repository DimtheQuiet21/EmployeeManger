DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT NOT NULL,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR (30) DEFAULT 'employee',
    salary DECIMAL NOT NULL,
    dept_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
     id INT NOT NULL,
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     role_id INT NOT NULL,
     manager_id INT DEFAULT NULL,
     PRIMARY KEY (id)
)