# Employee MYSQL Manager by Alan Lee

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

[Description](#description)

[Installation](#installation)

[Usage Information](#usage-information)

[Testing Instructions](#testing-instructions)

[Deployed Website](#deployed-website)

[Questions?](#questions?)

[Contributing](#contributing)

[License](#license)

## Description 
This project allows for the seeding and manipulation of a simple MYSQL database that has employee information. One thing should be noted, due to the limited functionality of the command line interface, knowing the relevant id's of the roles and employees will be required to add any new information to the database. This project relies on express, mysql2, and inquirer as the primary node modules. This database could be expanded with additional modularity and functionality in the future.

## Installation

MYSQL, NODE JS, and DOCKER are REQUIREMENTs for this application to run properly.

First, install the node modules with "npm install"
Second, spin up a docker virtual machine with the command 'npm run mysql:up'
Third, connect to the mysql database using the following command 'npm run mysql'
Fourth, when prompted enter the password found in the mysql.yml file to access mysql.
Fifth, now that mysql is running set the mysql source to the schema.sql using the following command, 'source ./db/schema.sql'
Sixth, seed the database by setting the source again to the seeds.sql using the following command, 'source ./db/seeds.sql'
Now you are ready to run the application with 'node ."
Finally, before closing the application entirely, free your port up and kill the docker virutal maching with the command "npm run mysql:down'

## Usage Information
Anyone can use this project however they wish!

## Testing Instructions

N/A

## GITHUB Repository
Link to Alan Lee's Employee MYSQL Manager: https://github.com/DimtheQuiet21/EmployeeManger

Link to VIDEO of Alan Lee's Employee MYSQL Manager: https://youtu.be/bwLIbQVeCe0
![Screenshot of Employee MYSQL Manager](./assets/screenshot.png)

## Questions?
Please Contact Alan Lee at aflee227@gmail.com if you have additional questions.

## Contributing 
There are no contribution guidelines.

## License 
The MIT was used for the creation and the publication of this Repository and Webpage.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)