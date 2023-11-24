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