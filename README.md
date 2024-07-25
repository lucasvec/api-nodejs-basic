Basic CRUD API in nodejs

Prerequisites:

-Install NodeJS: https://nodejs.org/en/download/

-Install Git: https://git-scm.com/downloads

-Install MySQL2: https://dev.mysql.com/downloads/installer/


Use on your machine:

1.
Install DBMS (Data Base Management System)
>>https://dev.mysql.com/downloads/installer/

2. Acquire
>>git clone https://github.com/lucasvec/api-nodejs-basic.git

3. install dependencies
>>npm install

4.
Configure database
  1. change db.config.js class with your credentials
  2. Run database script:
   
   >>CREATE TABLE product(
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL NOT NULL,
    category VARCHAR(30) NOT NULL
    )

5. Start api
>>npm start
