# Sumair Rasool
## Sample microservice
This is a sample code from a project which meant to automate/digitalize a park through turnstiles, rechargeable wrist bands and smart phone application.

## Installation

It requires [Node.js](https://nodejs.org/) v10+ to run.

Setup db connection and creaation of tables.

- Create database in MySQL
- Then you can pass db credentials in env variables or you can write into /app/config/environment.config.json. Environment variables for database connection are
    - DB_DATABASE
    - DB_USERNAME
    - DB_PASSWORD
    - DB_HOSTNAME
- To generate the tables in database go to /app/config/environment.config.json and set FORCE_DB_SYNC value to true, it will drop the tables and will generate db structure. Note: Once tables are generated set FORCE_DB_SYNC to false otherwise on every restart of app it will drop and create tables again which will cause the loss of data.

```sh
npm i
node app
```
