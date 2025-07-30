
require('dotenv').config();

const dbConfig = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'airbnbDB',
    host: process.env.DB_HOST || 'localhost',
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: "database_test",
    host: process.env.DB_HOST || 'localhost',
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: "database_production",
    host: process.env.DB_HOST || 'localhost',
    dialect: "mysql",
  },
};

module.exports = dbConfig;
