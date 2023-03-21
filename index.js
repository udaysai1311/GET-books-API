const express = require("express");
const app = express();
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "goodreads.db");
let db = null;

const initializeDbServer = async () => {
  // Here we are using try-catch statements if database is failed bc of various reasons.
  try {
    db = await open({
      // open()method is used to connect the database server and provides a object to connect to the server.The object return by open() method is a Promise object so we need to use async-await to wait till the object is returned.
      filename: dbPath, // This Promise object is stored inside a db variable.
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      // After database initialization the server will start.
      console.log("Started running the server on  https://localhost/3000");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
    process.exit(1); //This will force the NodeJS to exit the process from the server if the server fails or database.
  }
};

initializeDbServer(); // calling the function.

app.get("/books/", async (request, response) => {
  const booksQuery = `
        SELECT * FROM book ORDER BY book_id;
    `;
  const booksDetails = await db.all(booksQuery); //SQlite provides all() method is used to execute sql queries on database. This method will return Promise Object.
  response.send(booksDetails);
});
