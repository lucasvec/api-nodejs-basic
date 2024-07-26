# Basic CRUD API in Node.js

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **NodeJS**: Download and install from [here](https://nodejs.org/en/download/)
- **Git**: Download and install from [here](https://git-scm.com/downloads)
- **MySQL**: Download and install from [here](https://dev.mysql.com/downloads/installer/)

## Installation and Setup

Follow these steps to set up and run the API on your local machine:

### 1. Clone the Repository

Acquire the project by cloning the repository:

git clone https://github.com/lucasvec/api-nodejs-basic.git
cd api-nodejs-basic

### 2. Install Dependencies

Install the necessary dependencies by running:

**npm install**

### 3. Configure the Database
Ensure your MySQL server is running. Then, configure the database credentials by editing the db.config.js file with your MySQL credentials.

### 4. Create the Database Table
Run the following SQL script to create the product table in your database:

**CREATE TABLE product (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL NOT NULL,
    category VARCHAR(30) NOT NULL
);**


### 5. Start the API
Finally, start the API by running:

**npm start**
