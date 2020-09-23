
DROP DATABASE IF EXISTS workplaceDB;
CREATE DATABASE workplaceDB;

USE workplaceDB;

  CREATE TABLE department (
      id INT NOT NULL AUTO_INCREMENT,
      dept VARCHAR(100),
	  PRIMARY KEY(id)
  );

  CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id),
	PRIMARY KEY(id)
  );

   CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT ,
    FOREIGN KEY (role_id) REFERENCES role(id),
	PRIMARY KEY(id)
  );

  INSERT INTO employee (first_name, last_name)
VALUES ('Henry', 'Parrish');

INSERT INTO role (title, salary)
VALUES ('Sales Lead', 80000);

INSERT INTO department (dept)
VALUES ('Sales');

INSERT INTO employee (first_name, last_name)
VALUES ('Lily', 'Parrish');

INSERT INTO role (title, salary)
VALUES ('Software Engineer', 80000);

INSERT INTO department (dept)
VALUES ('Engineering');

INSERT INTO employee (first_name, last_name, manager_id)
VALUES ('Ben', 'Smith', 1);

INSERT INTO role (title, salary)
VALUES ('Salesman', 80000);

INSERT INTO department (dept)
VALUES ('Sales');

INSERT INTO employee (first_name, last_name, manager_id)
VALUES ('West', 'Mac', 1);

INSERT INTO role (title, salary)
VALUES ('Manager', 80000);

INSERT INTO department (dept)
VALUES ('Sales');
INSERT INTO employee (first_name, last_name)
VALUES ('Franklin', 'John');

INSERT INTO role (title, salary)
VALUES ('Manager', 80000);

INSERT INTO department (dept)
VALUES ('Sales');