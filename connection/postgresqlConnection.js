const { Client } = require('pg')
const dotenv = require("dotenv");

dotenv.config();

const connection = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to PostgreSQL!");

  const sqlCreateUserTable = `CREATE TABLE IF NOT EXISTS users
  (
      user_id serial PRIMARY KEY,
      username character varying(50) NOT NULL,
      password character varying(1000) NOT NULL,
      email character varying(255) NOT NULL,
      created_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
  );`;
  connection.query(sqlCreateUserTable, function (err, result) {
    if (err) throw err;
    console.log("User table is created!");
  });

  const sqlCreateBugTable = `CREATE TABLE IF NOT EXISTS bugs
  (
      bug_id serial PRIMARY KEY,
      bug text NOT NULL,
      user_id integer NOT NULL,
      created_on timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
      category character varying(255) NOT NULL,
      bugname character varying(255) NOT NULL
  );`;
  connection.query(sqlCreateBugTable, function (err, result) {
    if (err) throw err;
    console.log("Bug table is created!");
  });

  const sqlCreateCommentTable = `CREATE TABLE IF NOT EXISTS comments
  (
      comment_id serial PRIMARY KEY,
      comment text NOT NULL,
      user_id integer NOT NULL,
      bug_id integer NOT NULL,
      created_on timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`;
  connection.query(sqlCreateCommentTable, function (err, result) {
    if (err) throw err;
    console.log("Comment table is created!");
  });
});

module.exports = connection; 