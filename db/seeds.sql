-- Department seeds
INSERT INTO department (id, name)
VALUES (1, "Board"),
       (2, "Sales"),
       (3, "Engineering"),
       (4, "Finance"),
       (5, "Legal"); 

-- Role seeds
INSERT INTO role (department_id, title, salary)
VALUES (1, "CEO", 15000000),
       (2, "Sales Lead", 100000),
       (2, "Salesperson", 80000),
       (3, "Lead Engineer", 150000),
       (3, "Software Engineer", 120000),
       (4, "Accountant Manager", 160000),
       (4, "Accountant", 125000),
       (5, "Legal Team Lead", 250000),
       (5, "Lawyer", 190000);

-- Employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bruce", "Banner", 1, null),
       ("Steve", "Rodgers", 2, 1),
       ("Peter", "Parker", 3, NULL),
       ("Nick", "Fury", 4, 1),
       ("Stephen", "Strange", 5, 4), 
       ("Scott", "Lang", 6, 1),
       ("Peter", "Quill", 7, 5),
       ("Tony", "Stark", 8, 1),
       ("Rocket", "Raccon", 9, 6);