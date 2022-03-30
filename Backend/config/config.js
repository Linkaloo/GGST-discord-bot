require("dotenv").config();

module.exports = {
  development: {
    username: "user",
    password: "password",
    database: "postgres",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
