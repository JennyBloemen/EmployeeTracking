INSERT INTO department (id, department_name)
VALUES 
    (1,'HR'),
    (2,'Finance'),
    (3,'Sales'),
    (4,'Marketing'),
    (5,'IT');

INSERT INTO role (id, title, salary, department_id)
VALUES
    ( 'Director HR', 100000, 1),
    ( 'Director Finance', 100000, 2),
    ( 'Director Sales', 100000, 3),
    ( 'Director Marketing', 100000, 4),
    ( 'Director IT, 100000', 5),
    ( 'Manager HR', 80000, 1),
    ( 'Manager Finance', 80000, 2),
    ( 'Manager Sales', 80000, 3),
    ( 'Manager Marketing', 80000, 4),
    ( 'Manager IT', 80000, 5),
    ( 'Associate HR', 65000, 1),
    ( 'Associate Finance', 65000, 2),
    ( 'Associate Sales', 65000, 3),
    ( 'Associate Marketing', 65000, 4),
    ( 'Associate IT', 65000, 5),
    ( 'Intern Finance', 25,000, 2),
    ( 'Intern Marketing', 25,000, 4),
    ( 'Intern IT', 25,000, 5);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Jane", "Smith", 1, 1),
    ("Jon", "Charles", 2, 3),
    ("Porter", "Schow", 3, 2),
    ("Sadie", "Johnson", 4, 4),
    ("Naomi", "Cook", 5, 5);


