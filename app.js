const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

app.use(morgan("dev")); //logging middleware
app.use(express.static(path.join(__dirname, "./public"))); //serving up static files (e.g. css files)
app.use(express.urlencoded({ extended: false })); //parsing middleware for form input data
app.use(express.json());

// app.use("/wiki", require("./routes/wiki")); //if '/wiki, go to ./routes/wiki to check that file - if the method and route match, do the thing
// app.use("/users", require("./routes/users"));

module.exports = app;
