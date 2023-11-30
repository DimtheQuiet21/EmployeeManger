INSERT INTO department (id, dept_name)
VALUES (001, "Finance"),
       (002, "HR"),
       (003, "Marketing"),
       (004, "R&D"),
       (005, "Sales"),
       (006, 'IT'),
       (007, 'Operations'),
       (008, 'Management');


INSERT INTO role (id, title, salary, dept_id)
VALUES (001, "CEO", 250000, 008),
       (002, "COO", 200000, 008),
       (003, "Anyalst", 85000, 005),
       (004, "CFO", 120000, 008),
       (005, "IT Specialist", 60000, 006),
       (006, "Intern", 3.50, 007),
       (007, "Marketing Specialist", 50000, 003),
       (008, "Project Coordinator", 80000, 007);

INSERT INTO employee ( id, first_name, last_name, role_id, manager_id)
VALUES  (0001, "Bob", "Seger", 001, null),
        (0002, "Jim", "Brown", 002, 0001),
        (0003, "Debra", "Green", 004, 0001),
        (0004, "Gordon", "Levitt", 007, 0002),
        (0005, "Amy", "Puller", 005, 0002),
        (0006, "Jack", "White", 003, 0003),
        (0007, "Susan", "Shoemaker", 008, 0002),
        (0008, "Darren", "Dedede", 006, 0005),
        (0009, "Tom", "Tiggidy", 006, 0007),
        (0010, "Georgia", "Wallace", 006, 0006);
