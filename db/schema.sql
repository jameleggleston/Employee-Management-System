DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

-- Department Table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);