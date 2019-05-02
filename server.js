const express = require("express"); //import express package
require("express-async-errors");
const app = express(); // app is instance of express
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// database connection
require("./mongo");

// model
require("./model/Post");
require("./model/Comment");

// middleware
app.use(bodyParser.json()).use(morgan());

// Routes
app.use("/posts", require("./routes/posts"));

// Route not found
app.use((req, res, next) => {
  req.status = 404;
  const error = new Error("Routes not found");
  next(error);
});

if (app.get("env") === "production") {
  app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
      message: error.message
    });
  });
}

// Error Handling
app.use((error, req, res, next) => {
  res.status(req.status || 500).send({
    message: error.message,
    stack: error.stack
  });
});

// 3001 port is created
app.listen(3001, function() {
  console.log("Server is running on 3001 port");
});
