INSERT INTO department (id, department_name)
VALUES 
    (1,'HR'),
    (2,'Finance'),
    (3,'Sales'),
    (4,'Marketing'),
    (5,'IT');

INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, 'Director HR', 100000, 1),
    (2, 'Director Finance', 100000, 2),
    (3, 'Director Sales', 100000, 3),
    (4, 'Director Marketing', 100000, 4),
    (5, 'Director IT', 100000, 5),
    (6, 'Manager HR', 80000, 1),
    (7, 'Manager Finance', 80000, 2),
    (8, 'Manager Sales', 80000, 3),
    (9, 'Manager Marketing', 80000, 4),
    (10,'Manager IT', 80000, 5),
    (11,'Associate HR', 65000, 1),
    (12,'Associate Finance', 65000, 2),
    (13,'Associate Sales', 65000, 3),
    (14,'Associate Marketing', 65000, 4),
    (15,'Associate IT', 65000, 5),
    (16,'Intern Finance', 25000, 2),
    (17,'Intern Marketing', 25000, 4),
    (18,'Intern IT', 25000, 5);
    
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "Jane", "Smith", 1, NULL),
    (2, "Jon", "Denver", 2, 1),
    (3, "Porter", "Schow", 3, 2),
    (4, "Sadie", "Johnson", 4, 4),
    (5, "Naomi", "Cook", 5, 5);


